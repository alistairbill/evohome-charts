import { parse, unparse } from './parser';

const ex = `
{
  "1" : 
  {
    "2" : 
    {
      "3" : 
      {
        "4": 
        {
          "dailySchedules" : 
          [
            {
              "dayOfWeek" : "Monday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 20.0,
                  "timeOfDay" : "19:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Tuesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 20.0,
                  "timeOfDay" : "19:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Wednesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 20.0,
                  "timeOfDay" : "19:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Thursday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 20.0,
                  "timeOfDay" : "19:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Friday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 20.0,
                  "timeOfDay" : "19:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Saturday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 20.0,
                  "timeOfDay" : "19:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Sunday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 20.0,
                  "timeOfDay" : "19:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            }
          ],
          "name" : "Front Room",
          "zoneId" : "4"
        },
        "5" : 
        {
          "dailySchedules" : 
          [
            {
              "dayOfWeek" : "Monday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "08:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "11:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "12:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "14:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Tuesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "08:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "11:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "12:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "14:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Wednesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "08:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "11:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "12:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "14:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Thursday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "07:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "12:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "14:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Friday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "08:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "11:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "12:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "14:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Saturday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "08:20:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "13:30:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "21:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Sunday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "08:20:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "13:30:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "21:00:00"
                }
              ]
            }
          ],
          "name" : "Back Room",
          "zoneId" : "5"
        },
        "6" : 
        {
          "dailySchedules" : 
          [
            {
              "dayOfWeek" : "Monday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "12:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "14:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "15:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "17:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Tuesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "12:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "14:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "15:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "17:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Wednesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "12:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "14:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "15:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "17:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Thursday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "12:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "14:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "15:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "17:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Friday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "12:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "14:00:00"
                },
                {
                  "heatSetpoint" : 19.0,
                  "timeOfDay" : "15:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "17:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Saturday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "06:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "08:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "18:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "22:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Sunday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "06:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "08:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "18:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "22:30:00"
                }
              ]
            }
          ],
          "name" : "Loft Room",
          "zoneId" : "6"
        },
        "7" : 
        {
          "dailySchedules" : 
          [
            {
              "dayOfWeek" : "Monday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:30:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "22:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "22:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Tuesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:30:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "22:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "22:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Wednesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:30:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "22:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "22:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Thursday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:30:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "22:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "22:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Friday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:30:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "22:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "22:30:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Saturday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:30:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "22:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Sunday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "08:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:30:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "22:30:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            }
          ],
          "name" : "Front Bedroom",
          "zoneId" : "7"
        },
        "8" : 
        {
          "dailySchedules" : 
          [
            {
              "dayOfWeek" : "Monday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "07:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "09:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "17:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Tuesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "07:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "09:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "17:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Wednesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "07:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "09:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "17:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Thursday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "07:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "09:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "17:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Friday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "07:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "09:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "17:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Saturday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "08:20:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "17:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Sunday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "08:20:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "17:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "20:00:00"
                }
              ]
            }
          ],
          "name" : "Kitchen",
          "zoneId" : "8"
        },
        "9" : 
        {
          "dailySchedules" : 
          [
            {
              "dayOfWeek" : "Monday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "07:10:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Tuesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "07:10:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Wednesday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "07:10:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Thursday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "07:10:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Friday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "07:10:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "10:00:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Saturday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "08:20:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "13:30:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            },
            {
              "dayOfWeek" : "Sunday",
              "switchpoints" : 
              [
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "08:20:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "13:30:00"
                },
                {
                  "heatSetpoint" : 18.0,
                  "timeOfDay" : "16:00:00"
                },
                {
                  "heatSetpoint" : 10.0,
                  "timeOfDay" : "23:00:00"
                }
              ]
            }
          ],
          "name" : "Hall",
          "zoneId" : "9"
        },
        "systemId" : "3"
      },
      "gatewayId" : "2"
    },
    "locationId" : "1",
    "name" : "ManorRd"
  }
}` as const;

test('unparse(parse(ex)) should be ex', () => {
  expect(JSON.parse(unparse(parse(ex)))).toStrictEqual(JSON.parse(ex));
});
