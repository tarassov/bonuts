class MattermostHook
  prepend SimpleCommand
  def initialize(args)
    @args = args
  end

  def call
    RestClient.get(url, headers = {})
  end
end
