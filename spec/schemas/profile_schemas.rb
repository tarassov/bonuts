module SpecSchemas 

    class Profile
      def self.response
        return {
          "type": "object",
          "required": [],
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [],
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "type": {
                    "type": "string"
                  },
                  "attributes": {
                    "type": "object",
                    "required": [],
                    "properties": {
                      "active": {
                        "type": "boolean"
                      },
                      "admin": {
                        "type": "boolean"
                      },
                      "default": {
                        "type": "boolean"
                      },
                      "department": {
                        "type": ["object","null"],
                        "required": [],                       
                      },
                      "position": {
                        "type": ["string", "null"]
                      },
                      "store_admin": {
                        "type": "boolean"
                      },
                      "first_name": {
                        "type": "string"
                      },
                      "last_name": {
                        "type": "string"
                      },
                      "email": {
                        "type": "string"
                      },
                      "sex": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "user_avatar": {
                        "type": "object",
                        "required": [],
                        "properties": {
                          "url": {
                            "type": ["string","null"]
                          },
                          "thumb": {
                            "type": "object",
                            "required": [],
                            "properties": {
                              "url": {
                                "type": ["string","null"]
                              }
                            }
                          }
                        }
                      },
                      "logo": {
                        "type": "object",
                        "required": [],
                        "properties": {
                          "url": {
                            "type": ["string","null"]
                          },
                          "thumb": {
                            "type": "object",
                            "required": [],
                            "properties": {
                              "url": {
                                "type": ["string","null"]
                              }
                            }
                          }
                        }
                      },
                      "score_total": {
                        "type": "integer"
                      }
                    }
                  },
                  "relationships": {
                    "type": "object",
                    "required": [],
                    "properties": {
                      "user": {
                        "type": "object",
                        "required": [],
                        "properties": {
                          "data": {
                            "type": "object",
                            "required": [],
                            "properties": {
                              "id": {
                                "type": "string"
                              },
                              "type": {
                                "type": "string"
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
              "type": "array",
              "items": {
                "type": "object",
                "required": [],
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "type": {
                    "type": "string"
                  },
                  "attributes": {
                    "type": "object",
                    "required": [],
                    "properties": {
                      "id": {
                        "type": "number"
                      },
                      "email": {
                        "type": "string"
                      },
                      "last_name": {
                        "type": "string"
                      },
                      "first_name": {
                        "type": "string"
                      },
                      "sex": {
                        "type": "string"
                      },
                      "notes": {
                        "type": ["string","null"]
                      },
                      "email_confirmed": {
                        "type": ["boolean","null"]
                      },
                      "name": {
                        "type": "string"
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