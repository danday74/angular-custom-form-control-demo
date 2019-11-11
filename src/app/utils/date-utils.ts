import * as moment from 'moment'

export const momentToYearMonthDay = (myMoment: moment.Moment) => {
  return {year: myMoment.year(), month: myMoment.month() + 1, day: myMoment.date()}
}
