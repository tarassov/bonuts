# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if Rails.env.development?
  tenant = Tenant.create!(name: "demo", demo: true, active: true, domain: "avengers.ru", welcome_points: 10, use_departments: false)
  tony = User.create!(email: 'tony@avengers.ru', password: '123', active: true, email_confirmed: true, first_name: 'Тони', last_name: 'Старк')
  captain = User.create!(email: 'captain@avengers.ru', password: '123', active: true, email_confirmed: true, first_name: 'Стив', last_name: 'Роджерс')
  hulk = User.create!(email: 'hulk@avengers.ru', password: '123', active: true, email_confirmed: true, first_name: 'Халк', last_name: 'Петрович')

  ptony = Profile.create!(user: tony, tenant: tenant, active: true, admin: true, store_admin:true, position: "Iron man")
  pcap  = Profile.create!(user: captain, tenant: tenant, active: true, admin: false, store_admin:true, position: "Captain America")
  phulk = Profile.create!(user: hulk, tenant: tenant, active: true, admin: false,position: "Зеленый")

  Account.create!(profile: ptony, tenant: tenant, type: 'SelfAccount')
  Account.create!(profile: ptony, tenant: tenant, type: 'DistribAccount')

  Account.create!(profile: pcap, tenant: tenant, type: 'SelfAccount')
  Account.create!(profile: pcap, tenant: tenant, type: 'DistribAccount')

  Account.create!(profile: phulk, tenant: tenant, type: 'SelfAccount')
  Account.create!(profile: phulk, tenant: tenant, type: 'DistribAccount')
  
end
