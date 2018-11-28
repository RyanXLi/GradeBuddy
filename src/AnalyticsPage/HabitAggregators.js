import { dateDiffInDays } from '../util';

class HabitAggregator {
    constructor(aggregationName, getHabitValue) {
        this.aggregationName = aggregationName;
        this.getHabitValue = getHabitValue;
        this.aggregateHabits = this.aggregateHabits.bind(this);
    }

    aggregateHabits(course) {
        const dataOrigins = [];
        const data = [];
        for (const assignment of course.assignments) {
            const gradePercent = assignment.pointsEarned / assignment.pointsPossible * 100;
            const habitValue = this.getHabitValue(assignment.habits);
            if (isFinite(gradePercent) && isFinite(habitValue)) {
                dataOrigins.push(`${course.shortName}: ${assignment.name}`);
                data.push([habitValue, gradePercent]);
            }
        }
        return {data, dataOrigins};
    }
}

export const AGGREGATORS = [
    new HabitAggregator('Days started in advance', habits => 
        dateDiffInDays(new Date(habits.dateDue), new Date(habits.dateStarted))
    ),
    new HabitAggregator('Hours spent on assignment', habits => habits.hoursSpent),
    new HabitAggregator('% of lectures attended', habits => habits.lecturePercentage),
    new HabitAggregator('Worked with peers', habits => habits.workedWithPeers ? 1 : 0),
];
