export const calc = (input) => {
    const intersectionStreetsMap = {}

    input.streets.forEach((street) => {
        if (!intersectionStreetsMap[street.intersectionB])
            intersectionStreetsMap[street.intersectionB] = []

        intersectionStreetsMap[street.intersectionB].push(street.name)
    })

    const schedules = [];

    Object.entries(intersectionStreetsMap).forEach(([id, streets]) => {
        const scheduleItems = []

        streets.forEach(street => {
            scheduleItems.push({
                streetName: street,
                duration: 1
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
