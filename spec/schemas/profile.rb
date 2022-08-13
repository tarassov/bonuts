# frozen_string_literal: true

module SpecSchemas
  class Profile
    def self.response
      {
        "type": 'object',
        
        "properties": {
          "data": {
            "type": 'array',
            "items": {
              "type": 'object',
              
              "properties": {
                "id": {
                  "type": 'string'
                },
                "type": {
                  "type": 'string'
                },
                "attributes": {
                  "type": 'object',
                  
                  "properties": {
                    "active": {
                      "type": 'boolean'
                    },
                    "admin": {
                      "type": 'boolean'
                    },
                    "default": {
                      "type": 'boolean'
                    },
                    "department": {
                      "type": %w[object null],
                      "required": []
                    },
                    "position": {
                      "type": %w[string null]
                    },
                    "store_admin": {
                      "type": 'boolean'
                    },
                    "first_name": {
                      "type": 'string'
                    },
                    "last_name": {
                      "type": 'string'
                    },
                    "email": {
                      "type": 'string'
                    },
                    "sex": {
                      "type": 'string'
                    },
                    "name": {
                      "type": 'string'
                    },
                    "user_avatar": {
                      "type": 'object',
                      "properties": {
                        "url": {
                          "type": %w[string null]
                        },
                        "thumb": {
                          "type": 'object',
                          "properties": {
                            "url": {
                              "type": %w[string null]
                            }
                          }
                        }
                      }
                    },
                    "logo": {
                      "type": 'object',
                      "properties": {
                        "url": {
                          "type": %w[string null]
                        },
                        "thumb": {
                          "type": 'object',
                          
                          "properties": {
                            "url": {
                              "type": %w[string null]
                            }
                          }
                        }
                      }
                    },
                    "score_total": {
                      "type": 'integer'
                    }
                  }
                },
                "relationships": {
                  "type": 'object',
                  
                  "properties": {
                    "user": {
                      "type": 'object',
                      
                      "properties": {
                        "data": {
                          "type": 'object',
                          
                          "properties": {
                            "id": {
                              "type": 'string'
                            },
                            "type": {
                              "type": 'string'
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "included": {
            "type": 'array',
            "items": {
              "type": 'object',
              
              "properties": {
                "id": {
                  "type": 'string'
                },
                "type": {
                  "type": 'string'
                },
                "attributes": {
                  "type": 'object',
                  
                  "properties": {
                    "id": {
                      "type": 'number'
                    },
                    "email": {
                      "type": 'string'
                    },
                    "last_name": {
                      "type": 'string'
                    },
                    "first_name": {
                      "type": 'string'
                    },
                    "sex": {
                      "type": 'string'
                    },
                    "notes": {
                      "type": %w[string null]
                    },
                    "email_confirmed": {
                      "type": %w[boolean null]
                    },
                    "name": {
                      "type": 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
    end
  end
end
