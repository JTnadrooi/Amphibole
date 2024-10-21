function load() { // No support for for example 8x10 boards but that seems a bit unneeded.


}
// Assuming you are defining some functions for modular weapon data calculation
function calculateFullData(parts) {
    let dmg = 0;
    let mag = 0;
    let synergy = 0;
    let adrenaline = 0;
    let velocity = 0;
    let reloadTime = 0;
    let range = 0;
    let knockback = 0;
    let firerate = 0;
    let accuracy = 0;
    
    let partClasses = []; // Use an array instead of a collection since it's JavaScript
    
    parts.forEach(part => {
        // Accumulate values from each part
        dmg += part.dmg;
        mag += part.mag;
        range += part.range;
        firerate += part.firerate;
        knockback += part.knockback;
        reloadTime += part.reloadTime;

        adrenaline += Math.min(part.adrenaline, 1);  // Ensure adrenaline doesn't exceed 1
        partClasses.push(part.class);  // Add the class of the part to the array
    });

    // Remove duplicate classes using a Set and convert it back to an array
    let uniquePartClasses = [...new Set(partClasses)];
    let uniqueCount = uniquePartClasses.length;

    // Calculate synergy based on unique part classes
    synergy = Math.min(1.5 / uniqueCount, 1);  // Ensure synergy doesn't exceed 1.5

    // Apply synergy and other adjustments
    dmg *= synergy;
    accuracy *= 1 / firerate;  // Higher firerate reduces accuracy
    knockback *= 1 / mag;      // Larger magazine size reduces knockback
    firerate *= adrenaline;    // Firerate affected by adrenaline
    reloadTime *= Math.pow(adrenaline, 2);  // Reload time adjusted by adrenaline

    let finalClass;
    if (uniqueCount > 1) {
        finalClass = "mixed";  // More than one class -> mixed
    } else {
        finalClass = uniquePartClasses[0];  // Single class remains
    }

    // Return the final modular weapon data
    return {
        dmg,
        mag,
        synergy,
        adrenaline,
        velocity,
        reloadTime,
        range,
        knockback,
        firerate,
        accuracy,
        class: finalClass
    };
}
