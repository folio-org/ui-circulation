import moment from 'moment';
import {
  isEmpty,
  uniqueId,
} from 'lodash';

import Schedule from './Schedule';
import { Metadata } from '../common';

export default class FixedDueDateSchedule {
  static defaultFixedDueDateSchedule() {
    return { schedules: [{ key: uniqueId('schedule_') }] };
  }

  constructor({ id, name, metadata, schedules = [] } = {}) {
    this.id = id;
    this.name = name;
    this.metadata = new Metadata(metadata);
    this.schedules = schedules.reduce((list, item) => {
      const schedule = new Schedule(item);
      return [...list, schedule];
    }, []);
  }

  hasSchedules() {
    return !isEmpty(this.schedules);
  }

  getOverlappedDateRanges() {
    const overlaps = { hasOverlaps: false };
    for (let i = 0; i < this.schedules.length; i++) {
      const s1 = this.schedules[i];
      for (let j = i + 1; j < this.schedules.length; j++) {
        const s2 = this.schedules[j];
        const condA = (s1.from && s2.to) ? moment(s1.from).isBefore(s2.to) : false;
        const condB = (s1.to && s2.from) ? moment(s1.to).isAfter(s2.from) : false;
        if (condA && condB) {
          overlaps.num1 = i + 1;
          overlaps.num2 = j + 1;
          overlaps.hasOverlaps = true;
        }
      }
    }

    return overlaps;
  }

  hasOverlappingDateRange() {
    return this.schedules.length > 1 ? this.getOverlappedDateRanges().hasOverlaps : false;
  }

  hasInvalidSchedules() {
    return this.hasSchedules() && !this.schedules.every(({ from, to, due }) => from && to && due);
  }
}
