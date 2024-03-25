# frozen_string_literal: true

class ProfilesReport < Report
  def query
    type = @args[:report_type]
    search_text = @args[:search_text]
    date_from = @args[:date_from]
    date_to = @args[:date_to]

    total_subquery = case type
    when ReportTypes::SHOW_BALANCE
      Profile.select("profiles.id, sum(direction*amount) as total").left_joins(:self_account_operations).where(
        tenant_id: @current_tenant&.id,
        active: true,
      )
    when ReportTypes::SHOW_SCORE
      Profile.select("profiles.id, sum(amount) as total")
        .left_joins(:self_account_operations, self_account_operations: :deal)
        .where(
          tenant_id: @current_tenant&.id,
          active: true,
          account_operations: { direction: 1, deals: { deal_type: "transfer" } },
        )
    when ReportTypes::SHOW_SENT
      Profile.select("profiles.id, sum(amount) as total")
        .left_joins(:distrib_account_operations, distrib_account_operations: :deal)
        .where(
          tenant_id: @current_tenant&.id,
          active: true,
          account_operations: { direction: -1, deals: { deal_type: "transfer" } },
        )
    else
      return Profile.search_by(search_text).includes(:circles)
          .where(
            tenant_id: @current_tenant&.id,
            active: true,
          )
          .and(Profile.where("bot is null or bot = false")).select("profiles.*, 0 as score_total")
    end

    total_subquery = total_subquery.where(
      account_operations: { created_at: date_from... },
    ) if date_from.present?
    total_subquery = total_subquery.where(
      account_operations: { created_at: ...date_to },
    ) if date_to.present?

    Profile.search_by(search_text)
      .joins("LEFT JOIN (" + total_subquery.group("profiles.id").to_sql + ") as total on profiles.id=total.id").includes(:circles)
      .where(
        tenant_id: @current_tenant&.id,
        active: true,
      ).and(Profile.where("bot is null or bot = false")).select("profiles.*, coalesce(total.total,0) as score_total").order("score_total desc")
  end
end
