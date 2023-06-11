# frozen_string_literal: true

module FilterRequests
  def get_request_list(params)
    deleted = params.fetch(:deleted, false)
    requests = Request.accessible_by(current_ability).joins(:profile).where(deleted: [deleted, nil])
    requests = filter_my(requests, params)
    filter_by_statuses(requests, params)
  end

  def filter_by_statuses(requests, params)
    request_statuses = []
    request_statuses << 0 if incoming?(params)
    request_statuses << 1 if active?(params)
    request_statuses << 2 if archive?(params)
    requests = requests.where('status in (?)', request_statuses) if request_statuses.count.positive?
    requests
  end

  def filter?(params)
    params.key?(:archive) || params.key?(:active) || params.key?(:incoming)
  end

  def active?(params)
    params.fetch(:archive, !filter?(params))
  end

  def incoming?(params)
    params.fetch(:incoming, !filter?(params))
  end

  def archive?(params)
    params.fetch(:archive, !filter?(params))
  end

  def filter_my(requests, params)
    only_my = params.fetch(:my, false)
    return requests.where(profile: current_profile) if only_my

    requests
  end
end
