export const calc = (input) => {
    const intersectionStreetsMap = {}

    input.streets.forEach((street) => {
        if (!intersectionStreetsMap[street.intersectionA])
            intersectionStreetsMap[street.intersectionA] = []

        intersectionStreetsMap[street.intersectionA].push(street.name)

        if (!intersectionStreetsMap[street.intersectionB])
            intersectionStreetsMap[street.intersectionB] = []
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
