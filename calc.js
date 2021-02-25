export const calc = (input) => {
    const intersectionStreetsMap = {}

    const streetsIntersectionMap = {}

    input.streets.forEach((street) => {
        if (!intersectionStreetsMap[street.intersectionB])
            intersectionStreetsMap[street.intersectionB] = {}

        intersectionStreetsMap[street.intersectionB][street.name] = 0

        streetsIntersectionMap[street.name] = { a: street.intersectionA, b: street.intersectionB, time: street.time }
    })

    input.cars.filter(car => {
        const sum = car.streets.reduce((sum, name) => {
            if (!streetsIntersectionMap[name]) {
                console.log('Some fucking error')
                return sum
            }
            return sum + streetsIntersectionMap[name].time;
        }, 0)

        if(sum >= input.duration) {
            console.log(`Skipped item because way longer than duration (way: ${sum}, dur: ${input.duration})`)
            return false
        }

        return true
    })

    const schedules = [];

    input.cars.forEach(car => {
        car.streets.forEach(street => {
            const intersectionInfo = streetsIntersectionMap[street]

            if (intersectionInfo) {
                intersectionStreetsMap[intersectionInfo.b][street]++
            }
        })
    })

    Object.entries(intersectionStreetsMap).forEach(([id, streets]) => {
        const scheduleItems = []

        const sum = Object.entries(streets).reduce((sum, [street, count]) => sum + count, 0)

        Object.entries(streets).forEach(([street, count]) => {
            if (count === 0) return

            const val = (count / sum) * 10

            scheduleItems.push({
                streetName: street,
                duration: val > 0 ? (Math.floor(val) || 1) : 0
            })
        })

        if (scheduleItems.length === 0) {
            return
        }

        schedules.push(
            {
                intersectionId: id,
                streetsCount: scheduleItems.length,
                scheduleItems
            }
        )
    })

    return {
        name: input.name,
        scheduleCount: schedules.length,
        schedules
    }
}
