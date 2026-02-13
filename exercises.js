const EXERCISES = [
    {
        id: "neck-tilt",
        title: "Side Neck Tilt",
        category: "Desk",
        description: "Gently tilt your head towards your shoulder. Hold for 15 seconds each side.",
        benefit: "Relieves neck tension from looking at screens.",
        icon: "🧘‍♂️",
        illustration: "assets/illustrations/neck-tilt.png",
        workout: [
            "3x12 Slow Side Tilts (Left/Right)",
            "3x10 Chin Tucks (Retraction)",
            "2x15 Shoulder Rolls (Backward)",
            "4x30s Static holds with deep breathing"
        ],
        options: ["Sitting", "Standing"]
    },
    {
        id: "shoulder-shrug",
        title: "Shoulder Shrugs",
        category: "Desk",
        description: "Lift your shoulders towards your ears, hold briefly, and drop them down.",
        benefit: "Eases upper back and shoulder tightness.",
        icon: "💪",
        illustration: "assets/illustrations/shoulder-shrug.png",
        workout: [
            "3x20 Rapid Shrugs (Warm-up)",
            "3x10 Slow Eccentric Lowering (5s down)",
            "2x15 Forward & Backward Rolls",
            "3x12 Shoulder Blade Squeezes"
        ],
        options: ["Sitting", "Standing"]
    },
    {
        id: "wrist-stretch",
        title: "Wrist & Overlord Stretch",
        category: "Desk",
        description: "Extend your arm and gently pull your fingers back with the other hand.",
        benefit: "Great for heavy typing sessions.",
        icon: "🖐️",
        illustration: "assets/illustrations/wrist-stretch.png",
        workout: [
            "3x15 Prayer Stretch (Dynamic)",
            "3x15 Reverse Prayer Stretch",
            "2x20 Wrist Circles & Finger Fans",
            "4x45s Deep Static Hold (Alternating)"
        ],
        options: ["Sitting", "Standing"]
    },
    {
        id: "seated-twist",
        title: "Seated Spinal Twist",
        category: "Desk",
        description: "Sit tall and rotate your torso to one side using the chair for support.",
        benefit: "Improves spinal mobility and digestion.",
        icon: "🔄",
        illustration: "assets/illustrations/seated-twist.png",
        workout: [
            "3x10 Gentle Torso Pulses (per side)",
            "2x60s Deep Static Hold (Left)",
            "2x60s Deep Static Hold (Right)",
            "3x12 Cat-Cow seated variant"
        ],
        options: ["Sitting Only"]
    },
    {
        id: "brisk-walk",
        title: "5-Min Brisk Walk",
        category: "Walking",
        description: "Get up and walk around the room or hallway at a quick pace.",
        benefit: "Boosts circulation and mental clarity.",
        icon: "🚶‍♂️",
        illustration: "assets/illustrations/brisk-walk.png",
        workout: [
            "1x30 Joint Mobilization Steps",
            "4x60s High-Intensity Paced Walk",
            "1x30s Gentle Pacing & Cooling Down"
        ],
        options: ["Standing Only"]
    },
    {
        id: "standing-stretch",
        title: "Full Body Reach",
        category: "Walking",
        description: "Stand up, reach for the ceiling, and then touch your toes.",
        benefit: "Resets posture and stretches the hamstrings.",
        icon: "🤸‍♂️",
        illustration: "assets/illustrations/standing-stretch.png",
        workout: [
            "3x12 Alternating Arm Reaches",
            "3x10 Bilateral Sky Reach on Toes",
            "3x30s Slow Forward Fold Hold",
            "3x12 Chest Openers & Squeezes"
        ],
        options: ["Standing Only"]
    },
    {
        id: "desk-pushup",
        title: "Desk Push-ups",
        category: "Desk",
        description: "Place hands on the edge of the desk and perform a controlled push-up.",
        benefit: "Builds upper body strength and wakes up the core.",
        icon: "⚡",
        illustration: "assets/illustrations/desk-pushup.png",
        workout: [
            "2x15 Wrist Warm-up Circles",
            "4x12 Controlled Reps (45s rest)",
            "3x30s Tricep Desk Stretch"
        ],
        options: ["Standing (using desk support)"]
    },
    {
        id: "eye-focus",
        title: "20-20-20 Eye Exercise",
        category: "Eye",
        description: "Every 20 mins, look at something 20 feet away for 20 seconds.",
        benefit: "Reduces digital eye strain.",
        icon: "👁️",
        illustration: "assets/illustrations/eye-focus.png",
        workout: [
            "3x20 Rapid Blinking & Palming",
            "10x20s Distance Gazing (Focus Shifting)",
            "3x10 Eye Circles (CW/CCW)",
            "3x12 Near-to-Far Focus Shifts"
        ],
        options: ["Sitting", "Standing"]
    },
    {
        id: "seated-leg-ext",
        title: "Seated Leg Extensions",
        category: "Desk",
        description: "While seated, straighten one leg and hold for 5 seconds. Repeat 10 times per leg.",
        benefit: "Strengthens quads and promotes blood flow to the lower body.",
        icon: "🦵",
        illustration: "assets/illustrations/seated-leg-ext.png",
        workout: [
            "3x15 Ankle Circles (per leg)",
            "5x10s Alternating Static Holds",
            "3x30s Seated Hamstring Reach"
        ],
        options: ["Sitting Only"]
    },
    {
        id: "seated-marches",
        title: "Seated Marches",
        category: "Desk",
        description: "Lift your knees high as if marching, while staying seated in your chair.",
        benefit: "Wakes up the hip flexors and core.",
        icon: "👟",
        illustration: "assets/illustrations/seated-marches.png",
        workout: [
            "3x30 Low Knees Warm-up March",
            "4x20 High Knees with Core Bracing",
            "3x15 Seated Bicycle Twists",
            "3x30s Seated Hip Flexor Stretch"
        ],
        options: ["Sitting Only"]
    },
    {
        id: "standing-calf-raises",
        title: "Standing Calf Raises",
        category: "Walking",
        description: "Stand behind your chair, rise up onto your toes, then lower back down.",
        benefit: "Prevents ankle stiffness and tight calves.",
        icon: "🕴️",
        illustration: "assets/illustrations/standing-calf-raises.png",
        workout: [
            "4x15 Double Leg Slow Reps",
            "3x12 Single Leg (Left Focus)",
            "3x12 Single Leg (Right Focus)",
            "3x30s Standing Wall Calf Stretch"
        ],
        options: ["Standing Only"]
    },
    {
        id: "wall-sit",
        title: "30-Sec Wall Sit",
        category: "Walking",
        description: "Lean against a wall and slide down until your thighs are parallel to the floor.",
        benefit: "Builds lower body endurance and functional strength.",
        icon: "🧱",
        illustration: "assets/illustrations/wall-sit.png",
        workout: [
            "3x10s Finding Your Wall Position",
            "3x45s The Isometric Wall Sit Hold",
            "3x20 Leg Shakes & High Knees",
            "3x30s Standing Quad Stretch"
        ],
        options: ["Standing (against wall)"]
    },
    {
        id: "tricep-stretch",
        title: "Overhead Tricep Stretch",
        category: "Desk",
        description: "Reach one arm overhead, bend the elbow, and use the other hand to gently pull the elbow towards the center.",
        benefit: "Opens up the shoulders and eases upper arm tension.",
        icon: "🙆‍♂️",
        illustration: "assets/illustrations/tricep-stretch.png",
        workout: [
            "3x15 Overhead Pulsing Pulls (L)",
            "3x15 Overhead Pulsing Pulls (R)",
            "3x30s Deep Static Hold (per side)",
            "1x12 Dynamic Arm Circles"
        ],
        options: ["Sitting", "Standing"]
    },
    {
        id: "seated-figure4",
        title: "Seated Figure-Four Stretch",
        category: "Desk",
        description: "While seated, rest one ankle on the opposite knee and gently lean forward to feel a stretch in your hips.",
        benefit: "Relieves lower back pressure and tight hip flexors.",
        icon: "🧘‍♂️",
        illustration: "assets/illustrations/seated-figure4.png",
        workout: [
            "3x12 Dynamic Forward Leans (L)",
            "3x12 Dynamic Forward Leans (R)",
            "2x60s Deep Static Hold (per side)",
            "1x15 Seated Hip Circles"
        ],
        options: ["Sitting Only"]
    },
    {
        id: "chest-stretch",
        title: "Corner Chest Opener",
        category: "Walking",
        description: "Place your forearms on the walls of a corner and step forward until you feel a stretch across your chest.",
        benefit: "Counteracts rounded shoulders from long keyboard sessions.",
        icon: "👐",
        illustration: "assets/illustrations/chest-stretch.png",
        workout: [
            "3x12 Controlled Corner Leans",
            "4x30s Isometric Wall Press",
            "2x60s Static Hold with Deep Breath",
            "1x15 Dynamic Chest Expansions"
        ],
        options: ["Standing Only"]
    },
    {
        id: "forearm-stretch",
        title: "Forearm Flexor Stretch",
        category: "Desk",
        description: "Extend your arm with palm facing out and fingers down. Gently pull fingers back with other hand.",
        benefit: "Prevents repetitive strain from excessive mouse use.",
        icon: "👋",
        illustration: "assets/illustrations/forearm-stretch.png",
        workout: [
            "3x15 Pulsing Hand Pull-backs",
            "2x60s Deep Static Hold (Left)",
            "2x60s Deep Static Hold (Right)",
            "1x20 Finger Fans & Wrist Rotations"
        ],
        options: ["Sitting", "Standing"]
    }
];


