export const calc = (input) => {
    const intersectionStreetsMap = {}

    const streetsIntersectionMap = {}

    input.streets.forEach((street) => {
        if (!intersectionStreetsMap[street.intersectionB])
            intersectionStreetsMap[street.intersectionB] = {}

        intersectionStreetsMap[street.intersectionB][street.name] = 0

        streetsIntersectionMap[street.name] = { a: street.intersectionA, b: street.intersectionB }
    })

    const schedules = [];

    input.cars.forEach(car => {
        car.streets.forEach(street => {
            const intersectionInfo = streetsIntersectionMap[street]
            intersectionStreetsMap[intersectionInfo.b][street]++
        })
    })

    Object.entries(intersectionStreetsMap).forEach(([id, streets]) => {
        const scheduleItems = []

        Object.entries(streets).forEach(([street, count]) => {
            if (count === 0) return

            scheduleItems.push({
                streetName: street,
                duration: count > 5 ? 5 : count
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
