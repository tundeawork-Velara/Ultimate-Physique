import { useState } from "react";

const T = "training";
const R = "rest";

// ─── WORKOUT DATA ─────────────────────────────────────────────
const weekDays = [
  {
    day: "Monday", type: "Upper Body Max Strength", emoji: "💪", color: "#B84040",
    tag: "STRENGTH",
    doOrDie: [
      "100 Reverse Plank", "100 Rear Delt Flys", "100 Reverse Nordics",
      "100 Side-to-Side Plank Reach", "100 Pistol Squats", "100 Nordic Hamstring Curls",
      "100 Neck Curls / Extensions", "100 Reverse Curls", "100 Ab Wheel",
      "100 Curls (variations)", "100 Hip Thrust Bridges", "100 Leg Raises",
      "100 Tricep Extensions", "100 Flys",
      "Standard Push-Ups × 30", "100 Pike Push-Ups",
      "Close-Grip Push-Ups × 25", "Decline Push-Ups × 25", "Explosive Push-Ups × 20",
      "Diamond Push-Ups × 20", "Incline Push-Ups × 20", "Wide Push-Ups × 20",
      "Incline (small) × 20", "Archer Push-Ups × 20",
      "Tempo Push-Ups (3 sec down) × 20", "Pseudo Planche Push-Ups × 20",
      "Close-Grip Push-Ups × 20",
    ],
    exercises: [
      { name: "Weighted Pull-Ups (or Backpack Pull-Ups)", sets: 5, reps: "10", rest: "3 min", focus: "Back width + bicep strength" },
      { name: "Weighted Dips (or Chair Dips + Weight)", sets: 5, reps: "10", rest: "2–3 min", focus: "Chest + tricep compound" },
      { name: "Overhead Press (DBs / Barbell)", sets: 5, reps: "10", rest: "2–3 min", focus: "Shoulder max strength" },
      { name: "One-Arm DB Row", sets: 5, reps: "10/arm", rest: "2 min", focus: "Mid-back thickness" },
      { name: "Hanging Knee / Leg Raises", sets: 5, reps: "25", rest: "1 min", focus: "Core + hip flexors" },
      { name: "Farmer Carries (Heavy DBs / Bags)", sets: 5, reps: "40 sec", rest: "1 min", focus: "Grip + traps + core stability" },
      { name: "Bench Press (heavy)", sets: 5, reps: "10", rest: "2 min", focus: "Chest max strength" },
      { name: "Close-Grip Bench (heavy)", sets: 5, reps: "10", rest: "2 min", focus: "Tricep strength + inner chest" },
    ],
    nutrition: "Highest carb day. Banana at Meal 1 is non-negotiable. Rice at full 180g. Sweet potato at 180g for Meal 4 tonight.",
    suppNote: "Full pre-workout stack at 4 AM. Creatine on days like this is most impactful. Post-workout whey within 30 min of Meal 1.",
    muscleGroups: ["Chest", "Back", "Shoulders", "Triceps", "Biceps", "Core"],
  },
  {
    day: "Tuesday", type: "Lower Body Strength & Power", emoji: "🦵", color: "#C8943A",
    tag: "POWER",
    doOrDie: [
      "100 Reverse Plank", "100 Rear Delt Flys", "100 Reverse Nordics",
      "100 Side-to-Side Plank Reach", "100 Pistol Squats", "100 Nordic Hamstring Curls",
      "100 Neck Curls / Extensions", "100 Reverse Curls", "100 Ab Wheel",
      "100 Curls (variations)", "100 Hip Thrust Bridges", "100 Leg Raises",
      "100 Tricep Extensions", "100 Flys",
      "Standard Push-Ups × 30", "100 Pike Push-Ups",
      "Close-Grip Push-Ups × 25", "Decline Push-Ups × 25", "Explosive Push-Ups × 20",
      "Diamond Push-Ups × 20", "Incline Push-Ups × 20", "Wide Push-Ups × 20",
      "Incline (small) × 20", "Archer Push-Ups × 20",
      "Tempo Push-Ups (3 sec down) × 20", "Pseudo Planche Push-Ups × 20",
      "Close-Grip Push-Ups × 20",
    ],
    exercises: [
      { name: "Back Squat (DB Goblet if no rack)", sets: 5, reps: "10", rest: "3 min", focus: "Quad + glute compound" },
      { name: "Romanian Deadlift (DBs or Barbell)", sets: 5, reps: "10", rest: "2–3 min", focus: "Posterior chain — hamstrings + glutes" },
      { name: "Bulgarian Split Squat", sets: 5, reps: "10/leg", rest: "2 min", focus: "Unilateral quad + glute balance" },
      { name: "Hip Thrusts (Weighted)", sets: 5, reps: "10", rest: "2 min", focus: "Glute max strength" },
      { name: "Box Jumps / Step-Ups", sets: 5, reps: "10", rest: "1–2 min", focus: "Explosive power + fast-twitch" },
      { name: "Bench Press (volume)", sets: 5, reps: "15", rest: "3 min", focus: "Chest volume accumulation" },
      { name: "Incline Bench (volume)", sets: 5, reps: "15", rest: "3 min", focus: "Upper chest development" },
    ],
    nutrition: "High carb — legs demand the most glycogen. Sweet potato at full 180g tonight. Banana at Meal 1.",
    suppNote: "Creatine phosphocreatine demand is highest on squat/deadlift days. Full electrolyte mix during training.",
    muscleGroups: ["Quads", "Hamstrings", "Glutes", "Calves", "Core", "Chest (volume)"],
  },
  {
    day: "Wednesday", type: "Tactical Conditioning / Recovery", emoji: "🔥", color: "#3A8F5C",
    tag: "CONDITIONING",
    doOrDie: [],
    exercises: [
      { name: "Burpees", sets: 5, reps: "20", rest: "In circuit", focus: "Full body metabolic conditioning" },
      { name: "Push-Ups (Wide / Close mix)", sets: 5, reps: "25", rest: "In circuit", focus: "Chest + tricep endurance" },
      { name: "Pull-Ups (Assisted if needed)", sets: 5, reps: "15", rest: "In circuit", focus: "Back + bicep endurance" },
      { name: "Walking Lunges (Weighted optional)", sets: 5, reps: "30", rest: "In circuit", focus: "Quad + glute endurance" },
      { name: "200m Sprint / High-Knee Run", sets: 5, reps: "1", rest: "2 min between rounds", focus: "Cardiovascular + lactate threshold" },
    ],
    circuitNote: "5 Rounds · Operator Circuit. 2 min rest between rounds only.",
    nutrition: "Moderate carb day. No Do or Die circuit. Meals as scheduled — no adjustments needed. Focus on hydration.",
    suppNote: "Standard stack. Fermented beet root especially valuable for cardio output. L-Theanine post-training coffee supports mental clarity for work after conditioning.",
    muscleGroups: ["Full Body", "Cardiovascular", "Metabolic"],
  },
  {
    day: "Thursday", type: "Upper Body Hypertrophy & Push-Pull", emoji: "📈", color: "#4A72D4",
    tag: "HYPERTROPHY",
    doOrDie: [
      "100 Reverse Plank", "100 Rear Delt Flys", "100 Reverse Nordics",
      "100 Side-to-Side Plank Reach", "100 Pistol Squats", "100 Nordic Hamstring Curls",
      "100 Neck Curls / Extensions", "100 Reverse Curls", "100 Ab Wheel",
      "100 Curls (variations)", "100 Hip Thrust Bridges", "100 Leg Raises",
      "100 Tricep Extensions", "100 Flys",
      "Standard Push-Ups × 30", "100 Pike Push-Ups",
      "Close-Grip Push-Ups × 25", "Decline Push-Ups × 25", "Explosive Push-Ups × 20",
      "Diamond Push-Ups × 20", "Incline Push-Ups × 20", "Wide Push-Ups × 20",
      "Incline (small) × 20", "Archer Push-Ups × 20",
      "Tempo Push-Ups (3 sec down) × 20", "Pseudo Planche Push-Ups × 20",
      "Close-Grip Push-Ups × 20",
    ],
    exercises: [
      { name: "Incline DB Bench Press", sets: 5, reps: "10", rest: "90 sec", focus: "Upper chest hypertrophy" },
      { name: "Pull-Ups / Chin-Ups", sets: 5, reps: "15 / AMRAP", rest: "2 min", focus: "Back width + bicep volume" },
      { name: "Ring / Chair Dips", sets: 5, reps: "10", rest: "2 min", focus: "Chest + tricep hypertrophy" },
      { name: "Face Pulls / Band Pull-Aparts", sets: 5, reps: "15", rest: "1 min", focus: "Rear delt + rotator cuff health" },
      { name: "Hammer Curls", sets: 5, reps: "15", rest: "1 min", focus: "Brachialis + brachioradialis" },
      { name: "Lateral Raises", sets: 5, reps: "15", rest: "1 min", focus: "Medial delt width" },
      { name: "Speed Bench (explosive)", sets: 8, reps: "5", rest: "1 min", focus: "Rate of force development" },
      { name: "Spoto Press (3 sec hold at bottom)", sets: 5, reps: "5", rest: "1 min", focus: "Tension + bottom-position strength" },
    ],
    nutrition: "High carb — hypertrophy day requires glycogen for volume work. Full banana + rice. Kiwi at Meal 3 especially relevant — reduces next-day DOMS.",
    suppNote: "Creatine particularly valuable for the 8×5 speed bench sets — rapid phosphocreatine replenishment between sets.",
    muscleGroups: ["Upper Chest", "Back", "Rear Delts", "Biceps", "Lateral Delts", "Triceps"],
  },
  {
    day: "Friday", type: "Lower Body Power & Posterior Chain", emoji: "⚡", color: "#6B4FBB",
    tag: "POSTERIOR",
    doOrDie: [
      "100 Reverse Plank", "100 Rear Delt Flys", "100 Reverse Nordics",
      "100 Side-to-Side Plank Reach", "100 Pistol Squats", "100 Nordic Hamstring Curls",
      "100 Neck Curls / Extensions", "100 Reverse Curls", "100 Ab Wheel",
      "100 Curls (variations)", "100 Hip Thrust Bridges", "100 Leg Raises",
      "100 Tricep Extensions", "100 Flys",
      "Standard Push-Ups × 30", "100 Pike Push-Ups",
      "Close-Grip Push-Ups × 25", "Decline Push-Ups × 25", "Explosive Push-Ups × 20",
      "Diamond Push-Ups × 20", "Incline Push-Ups × 20", "Wide Push-Ups × 20",
      "Incline (small) × 20", "Archer Push-Ups × 20",
      "Tempo Push-Ups (3 sec down) × 20", "Pseudo Planche Push-Ups × 20",
      "Close-Grip Push-Ups × 20",
    ],
    exercises: [
      { name: "Front Squat (DB Goblet or Barbell)", sets: 5, reps: "10", rest: "3 min", focus: "Quad dominance + core stability" },
      { name: "Romanian Deadlift", sets: 5, reps: "10", rest: "2–3 min", focus: "Hamstring + glute stretch strength" },
      { name: "Hip Thrusts", sets: 5, reps: "10", rest: "2 min", focus: "Glute activation + posterior power" },
      { name: "Broad Jumps / Step Jumps", sets: 5, reps: "10", rest: "1–2 min", focus: "Horizontal explosive power" },
      { name: "Farmer Carries", sets: 5, reps: "40 sec", rest: "1 min", focus: "Loaded carry — grip + traps + stabilizers" },
      { name: "Paused Bench (5 sec hold, explode up)", sets: 5, reps: "5", rest: "1 min", focus: "Eccentric control + explosive concentric" },
      { name: "Press (no shoulder extension)", sets: 5, reps: "5", rest: "1 min", focus: "Shoulder joint health + strict pressing" },
    ],
    nutrition: "High carb — posterior chain training burns enormous glycogen. Last high-carb meal of the week. Maximize sweet potato tonight for weekend recovery.",
    suppNote: "End of the high-intensity week. Magnesium at 9:30 PM especially important tonight — supports weekend recovery and reduces accumulated muscle soreness.",
    muscleGroups: ["Quads", "Hamstrings", "Glutes", "Posterior Chain", "Grip", "Shoulders"],
  },
  {
    day: "Saturday", type: "Full-Body Operator Circuit", emoji: "🎖️", color: "#B84040",
    tag: "OPERATOR",
    doOrDie: [],
    exercises: [
      { name: "400m Run / Stair Run", sets: 5, reps: "1", rest: "In circuit", focus: "Aerobic capacity + leg endurance" },
      { name: "Burpees", sets: 5, reps: "20", rest: "In circuit", focus: "Full body explosive conditioning" },
      { name: "Pull-Ups", sets: 5, reps: "15", rest: "In circuit", focus: "Back + bicep pulling endurance" },
      { name: "Goblet Squats", sets: 5, reps: "20", rest: "In circuit", focus: "Quad + glute metabolic work" },
      { name: "Kettlebell / DB Swings", sets: 5, reps: "20", rest: "In circuit", focus: "Hip hinge + posterior chain power" },
      { name: "40m Weighted Carry / Backpack Carry", sets: 5, reps: "1", rest: "2 min between rounds", focus: "Loaded movement + mental toughness" },
    ],
    circuitNote: "5 Rounds · Full-Body Operator Circuit. 2 min rest between rounds.",
    nutrition: "Training day macros. Highest aerobic demand of the week — full banana at Meal 1, full carb portions throughout.",
    suppNote: "Beet root + maca especially potent for the 400m run sets. Nitric oxide from beet root sustains aerobic threshold longer.",
    muscleGroups: ["Full Body", "Cardiovascular", "Grip", "Core", "Posterior Chain"],
  },
  {
    day: "Sunday", type: "Mobility & Active Recovery", emoji: "🧘", color: "#3A8F5C",
    tag: "RECOVERY",
    doOrDie: [],
    exercises: [
      { name: "Full-Body Stretching / Yoga Flow", sets: 1, reps: "60 min", rest: "—", focus: "Fascia release + joint mobility" },
      { name: "Band Shoulder & Rotator Cuff Work", sets: 3, reps: "15–20/direction", rest: "30 sec", focus: "Shoulder health — high volume week demands this" },
      { name: "Plank Variations", sets: 4, reps: "60 sec each", rest: "30 sec", focus: "Core stability without spinal load" },
      { name: "Optional Light Swim or Walk", sets: 1, reps: "20–30 min", rest: "—", focus: "Active recovery + lymphatic drainage" },
    ],
    nutrition: "Rest day macros. Lowest carbs of the week. This is your cellular repair and autophagy day. Fast discipline is most important today — hold the 5 PM cutoff strictly.",
    suppNote: "Skip Pre-Workout today. Take Growth + Magnesium at 9:30 PM — critical after a heavy training week. This is when muscle is actually built.",
    muscleGroups: ["Mobility", "Rotator Cuff", "Core", "Recovery"],
  },
];

// ─── MEALS ───────────────────────────────────────────────────
const meals = {
  [T]: [
    {
      id: "m1", time: "9:00 AM", label: "MEAL 1", title: "Post-Workout Recovery Breakfast",
      sub: "Break the fast · Anabolic window · Largest meal", emoji: "🍳", color: "#C8943A",
      items: [
        { name: "Whole eggs", amt: "3 large (150g)", p: 18, c: 1, f: 15, cal: 210 },
        { name: "Egg whites", amt: "5 whites (150g)", p: 18, c: 1, f: 0, cal: 75 },
        { name: "Grass-Fed Whey Isolate", amt: "1 scoop (~30g)", p: 25, c: 3, f: 2, cal: 130 },
        { name: "Rolled oats (dry)", amt: "80g", p: 10, c: 54, f: 5, cal: 300 },
        { name: "Banana", amt: "1 medium (120g)", p: 1, c: 27, f: 0, cal: 105 },
        { name: "Blueberries", amt: "80g", p: 1, c: 11, f: 0, cal: 46 },
        { name: "Ground flaxseed", amt: "15g", p: 2, c: 3, f: 6, cal: 74 },
        { name: "Baby spinach (raw)", amt: "40g", p: 1, c: 1, f: 0, cal: 9 },
        { name: "Extra virgin olive oil", amt: "1 tsp (5g)", p: 0, c: 0, f: 5, cal: 40 },
      ],
      note: "Break the fast within 30 min of sitting down. Whey + eggs create a rapid leucine spike that kicks off muscle protein synthesis immediately. Banana replenishes glycogen burned during fasted training. Do not skip this meal.",
      keys: ["Glycogen replenishment (banana + oats)", "Anti-inflammatory (blueberries)", "Omega-3 (flax)", "Complete protein (eggs + whey)"],
    },
    {
      id: "m2", time: "12:00 PM", label: "MEAL 2", title: "Performance Lunch",
      sub: "Peak insulin sensitivity · Protein + veggie anchor", emoji: "⚡", color: "#3A8F5C",
      items: [
        { name: "Chicken breast (cooked)", amt: "220g", p: 68, c: 0, f: 4, cal: 307 },
        { name: "White rice (cooked)", amt: "180g", p: 3, c: 40, f: 0, cal: 180 },
        { name: "Broccoli (steamed)", amt: "120g", p: 3, c: 7, f: 0, cal: 41 },
        { name: "Kale (wilted)", amt: "80g", p: 3, c: 6, f: 1, cal: 43 },
        { name: "Purple cabbage (raw)", amt: "60g", p: 1, c: 4, f: 0, cal: 20 },
        { name: "Avocado", amt: "½ medium (75g)", p: 1, c: 4, f: 11, cal: 112 },
        { name: "Sauerkraut (raw)", amt: "60g", p: 1, c: 2, f: 0, cal: 11 },
        { name: "Lemon + garlic + pepper", amt: "to taste", p: 0, c: 1, f: 0, cal: 5 },
      ],
      note: "Sauerkraut always cold. Lemon on kale boosts iron absorption. This meal sustains energy through the afternoon work block.",
      keys: ["Sulforaphane (broccoli + kale)", "Anthocyanins (purple cabbage)", "Probiotics (sauerkraut)", "Healthy fat (avocado)"],
    },
    {
      id: "m3", time: "2:30 PM", label: "MEAL 3", title: "Fruit + Protein Snack",
      sub: "Micronutrient hit · Sustained energy mid-window", emoji: "🍓", color: "#B84040",
      items: [
        { name: "Greek yogurt (plain, full-fat)", amt: "200g", p: 20, c: 8, f: 10, cal: 200 },
        { name: "Mango (diced)", amt: "100g", p: 1, c: 25, f: 0, cal: 99 },
        { name: "Kiwi (sliced)", amt: "2 medium (148g)", p: 2, c: 18, f: 1, cal: 90 },
        { name: "Pomegranate seeds", amt: "50g", p: 1, c: 9, f: 0, cal: 41 },
        { name: "Walnuts (raw)", amt: "20g", p: 5, c: 4, f: 13, cal: 131 },
        { name: "Ground cinnamon", amt: "¼ tsp", p: 0, c: 0, f: 0, cal: 2 },
      ],
      note: "Kiwi reduces DOMS — especially valuable after high-volume Do or Die circuit days. Pomegranate ellagic acid reduces muscle damage markers.",
      keys: ["DOMS reduction (kiwi)", "Muscle recovery (pomegranate)", "Beta-carotene (mango)", "ALA omega-3 (walnuts)"],
    },
    {
      id: "m4", time: "4:30 PM", label: "MEAL 4", title: "Last Meal — Overnight Fuel",
      sub: "Eaten by 5:00 PM · Fuels tomorrow's 4 AM training", emoji: "🌿", color: "#6B4FBB",
      items: [
        { name: "Salmon fillet (cooked)", amt: "200g", p: 40, c: 0, f: 20, cal: 350 },
        { name: "Sweet potato (baked)", amt: "180g", p: 3, c: 36, f: 0, cal: 154 },
        { name: "Asparagus (roasted)", amt: "120g", p: 3, c: 5, f: 0, cal: 27 },
        { name: "Spinach (wilted)", amt: "100g", p: 3, c: 3, f: 0, cal: 23 },
        { name: "Bell peppers, mixed (roasted)", amt: "100g", p: 1, c: 6, f: 0, cal: 31 },
        { name: "Extra virgin olive oil", amt: "1 tbsp (14g)", p: 0, c: 0, f: 14, cal: 119 },
        { name: "Lemon + garlic + turmeric + black pepper", amt: "to taste", p: 0, c: 1, f: 0, cal: 5 },
      ],
      note: "This meal fuels your 4 AM session tomorrow. Sweet potato glycogen releases slowly overnight. Salmon EPA/DHA reduces inflammation during sleep. Turmeric + black pepper activates curcumin.",
      keys: ["EPA/DHA omega-3 (salmon)", "Overnight glycogen (sweet potato)", "Vitamin C (bell pepper)", "Anti-inflammatory (turmeric)"],
    },
  ],
  [R]: [
    {
      id: "r1", time: "9:00 AM", label: "MEAL 1", title: "Morning Rebuild Breakfast",
      sub: "Lower carbs · Same protein · Cellular repair day", emoji: "🍳", color: "#C8943A",
      items: [
        { name: "Whole eggs", amt: "3 large (150g)", p: 18, c: 1, f: 15, cal: 210 },
        { name: "Egg whites", amt: "5 whites (150g)", p: 18, c: 1, f: 0, cal: 75 },
        { name: "Grass-Fed Whey Isolate", amt: "1 scoop (~30g)", p: 25, c: 3, f: 2, cal: 130 },
        { name: "Rolled oats (dry)", amt: "50g", p: 6, c: 34, f: 3, cal: 187 },
        { name: "Blueberries", amt: "80g", p: 1, c: 11, f: 0, cal: 46 },
        { name: "Strawberries (sliced)", amt: "100g", p: 1, c: 8, f: 0, cal: 32 },
        { name: "Ground flaxseed", amt: "15g", p: 2, c: 3, f: 6, cal: 74 },
        { name: "Baby spinach (raw)", amt: "40g", p: 1, c: 1, f: 0, cal: 9 },
        { name: "Extra virgin olive oil", amt: "1 tsp (5g)", p: 0, c: 0, f: 5, cal: 40 },
      ],
      note: "Rest day: oats reduced, banana swapped for strawberries. Fisetin in strawberries amplifies autophagy — the cellular cleanup that the 16-hr fast initiates. Protein stays identical to training days.",
      keys: ["Fisetin + autophagy (strawberries)", "Antioxidants (blueberries)", "Omega-3 (flax)", "Complete protein"],
    },
    {
      id: "r2", time: "12:00 PM", label: "MEAL 2", title: "Recovery Lean Plate",
      sub: "High protein · Reduced carbs · Gut health constant", emoji: "🥗", color: "#3A8F5C",
      items: [
        { name: "Chicken breast (cooked)", amt: "230g", p: 71, c: 0, f: 4, cal: 321 },
        { name: "Brown rice (cooked)", amt: "120g", p: 2, c: 26, f: 1, cal: 120 },
        { name: "Broccoli (steamed)", amt: "150g", p: 4, c: 9, f: 0, cal: 51 },
        { name: "Kale (wilted)", amt: "80g", p: 3, c: 6, f: 1, cal: 43 },
        { name: "Cherry tomatoes", amt: "100g", p: 1, c: 4, f: 0, cal: 18 },
        { name: "Cucumber (sliced)", amt: "100g", p: 1, c: 4, f: 0, cal: 15 },
        { name: "Avocado", amt: "½ medium (75g)", p: 1, c: 4, f: 11, cal: 112 },
        { name: "Sauerkraut (raw)", amt: "60g", p: 1, c: 2, f: 0, cal: 11 },
      ],
      note: "Lycopene in cherry tomatoes is the strongest dietary antioxidant for testosterone protection. Cucumber adds electrolytes with near-zero calories.",
      keys: ["Lycopene (tomatoes)", "Sulforaphane (broccoli + kale)", "Electrolytes (cucumber)", "Probiotics"],
    },
    {
      id: "r3", time: "2:30 PM", label: "MEAL 3", title: "Low-Carb Fruit + Fat Snack",
      sub: "Fat-dominant · Zinc-rich · No training carb load", emoji: "🍇", color: "#B84040",
      items: [
        { name: "Greek yogurt (plain, full-fat)", amt: "200g", p: 20, c: 8, f: 10, cal: 200 },
        { name: "Mixed berries (raspberry + blackberry + blueberry)", amt: "150g", p: 2, c: 18, f: 1, cal: 85 },
        { name: "Walnuts (raw)", amt: "25g", p: 6, c: 4, f: 16, cal: 164 },
        { name: "Pumpkin seeds (raw)", amt: "20g", p: 5, c: 3, f: 6, cal: 88 },
        { name: "Ground cinnamon", amt: "¼ tsp", p: 0, c: 0, f: 0, cal: 2 },
      ],
      note: "Pumpkin seeds: one of the richest plant zinc sources — supports testosterone and overnight recovery. No banana needed — no glycogen to replenish.",
      keys: ["Zinc (pumpkin seeds)", "Ellagic acid (raspberries)", "ALA omega-3 (walnuts)", "Insulin regulation (cinnamon)"],
    },
    {
      id: "r4", time: "4:30 PM", label: "MEAL 4", title: "Last Meal — Overnight Fuel",
      sub: "Reduced carbs · Rest day · Fast begins at 5 PM", emoji: "🌿", color: "#6B4FBB",
      items: [
        { name: "Salmon fillet (cooked)", amt: "200g", p: 40, c: 0, f: 20, cal: 350 },
        { name: "Sweet potato (baked)", amt: "120g", p: 2, c: 24, f: 0, cal: 103 },
        { name: "Asparagus (roasted)", amt: "150g", p: 4, c: 6, f: 0, cal: 34 },
        { name: "Zucchini (roasted)", amt: "120g", p: 2, c: 4, f: 0, cal: 21 },
        { name: "Spinach (wilted)", amt: "100g", p: 3, c: 3, f: 0, cal: 23 },
        { name: "Bell peppers, mixed (roasted)", amt: "100g", p: 1, c: 6, f: 0, cal: 31 },
        { name: "Extra virgin olive oil", amt: "1 tbsp (14g)", p: 0, c: 0, f: 14, cal: 119 },
        { name: "Lemon + garlic + turmeric + black pepper", amt: "to taste", p: 0, c: 1, f: 0, cal: 5 },
      ],
      note: "Reduced sweet potato on rest day. Zucchini adds manganese — cofactor for superoxide dismutase, primary recovery antioxidant enzyme. Salmon dose never changes.",
      keys: ["EPA/DHA omega-3 (salmon)", "Manganese (zucchini)", "Vitamin C (bell pepper)", "Anti-inflammatory (turmeric)"],
    },
  ],
};

// ─── SUPPLEMENTS ─────────────────────────────────────────────
const suppSchedule = [
  { time: "4:00 AM", icon: "🙏", label: "Wake · Prayer · Pre-Training Stack", color: "#6B4FBB",
    supps: [
      { name: "Methylcobalamin B12 1,000mcg sublingual", note: "Dissolve under tongue first — before anything else. Does not break fast." },
      { name: "Bulk Pre-Workout", note: "Mix and drink. Training starts in 15 min." },
      { name: "Fermented Beet Root + Black Maca", note: "Nitric oxide + adrenal support. Amplified in fasted state." },
      { name: "Vitality Testosterone Support (2 caps)", note: "KSM-66 buffers the cortisol spike from fasted early training." },
    ], warning: null },
  { time: "4:30–8:00 AM", icon: "🏋️", label: "Training — Do or Die + Main Session", color: "#B84040",
    supps: [
      { name: "Water + Electrolytes (sea salt + lite salt)", note: "Sip throughout. 3.5 hrs fasted = high electrolyte loss. Non-negotiable." },
    ], warning: null },
  { time: "8:00 AM", icon: "☕", label: "Coffee + Focus Stack", color: "#C8943A",
    supps: [
      { name: "Black Coffee", note: "Continued fast. Amplifies fat oxidation post-training." },
      { name: "L-Theanine 200mg", note: "Stacked with coffee. Alpha wave clarity for morning work block." },
    ], warning: null },
  { time: "9:00 AM", icon: "🍳", label: "Break Fast — Meal 1 + Morning Supps", color: "#3A8F5C",
    supps: [
      { name: "Grass-Fed Whey Protein Isolate", note: "In oats or shake. Fastest leucine delivery post-fasted training." },
      { name: "Vitamin D3 + K2 Drops", note: "With food fat (eggs + olive oil). Fat-soluble — must be taken with food." },
      { name: "DHT Blocker / Simply Revival (2 caps)", note: "5 hrs after Vitality. BioPerine cleared — saw palmetto absorbs at normal rate." },
      { name: "SuperBeets Chew (optional)", note: "Separate cardiovascular nitrate dose from 4 AM beet root." },
    ], warning: "⚠️ Check Vitality label for D3 content. If 1,000+ IU listed, reduce D3 drops to 1 drop to stay under 5,000 IU daily total." },
  { time: "9:30 PM", icon: "🌙", label: "Pre-Sleep Recovery Stack", color: "#4A72D4",
    supps: [
      { name: "Growth Powder (Transparent Labs)", note: "30–60 min before sleep. Primes overnight HGH pulse." },
      { name: "Magnesium Bisglycinate", note: "Deepens sleep, lowers cortisol, supports testosterone synthesis overnight." },
    ], warning: null },
];

// ─── GROCERY ─────────────────────────────────────────────────
const grocery = [
  { cat: "Proteins", emoji: "🥩", items: ["Chicken breast — 1.6kg", "Salmon fillet — 1.4kg (7 × 200g)", "Whole eggs — 2 dozen", "Egg whites (carton) — 1L", "Greek yogurt (plain, full-fat) — 1.4kg"] },
  { cat: "Fruits", emoji: "🍓", items: ["Bananas — 4 medium (training days)", "Blueberries — 700g", "Strawberries — 400g (rest days)", "Mango — 4 (training days)", "Kiwi — 8 medium", "Pomegranate seeds — 350g", "Raspberries + blackberries — 400g (rest days)"] },
  { cat: "Vegetables", emoji: "🥦", items: ["Baby spinach — 1kg", "Broccoli — 1kg", "Kale — 600g", "Asparagus — 840g", "Bell peppers, mixed — 700g", "Purple cabbage — 1 small head", "Cherry tomatoes — 700g", "Cucumber — 4 medium", "Zucchini — 4 medium", "Avocados — 7 medium", "Sauerkraut (raw, unpasteurized) — 420g"] },
  { cat: "Carbs & Starches", emoji: "🌾", items: ["Rolled oats — 560g", "White rice — 1kg (dry)", "Brown rice — 500g (rest days)", "Sweet potatoes — 1.2kg"] },
  { cat: "Healthy Fats", emoji: "🫒", items: ["Extra virgin olive oil — 500ml", "Walnuts (raw) — 175g", "Ground flaxseed — 105g", "Pumpkin seeds (raw) — 140g"] },
  { cat: "Pantry", emoji: "🧂", items: ["Cinnamon, turmeric, paprika, black pepper, sea salt, garlic powder", "Lemons — 7", "Garlic — 2 heads", "Sea salt + cream of tartar (electrolytes)", "Creatine monohydrate — 250g"] },
];

const swaps = [
  { from: "Chicken breast", to: "Turkey breast or 93% lean ground beef", why: "Higher zinc + iron — testosterone support" },
  { from: "Salmon", to: "Sardines or mackerel (canned in water)", why: "Higher EPA/DHA per gram, more affordable" },
  { from: "Banana", to: "2 Medjool dates", why: "Same glycogen hit, richer potassium" },
  { from: "Mango", to: "Papaya", why: "Papain enzyme aids digestion of large protein meals" },
  { from: "White rice", to: "Quinoa", why: "Complete protein — +8g protein per cup, more fiber" },
  { from: "Sweet potato", to: "Butternut squash", why: "Similar carbs, very high vitamin A and carotenoids" },
  { from: "Greek yogurt", to: "Kefir (drinkable)", why: "3–4× more probiotic strains, same protein" },
  { from: "Walnuts", to: "Hemp seeds", why: "Complete protein + omega-3 + more zinc and iron" },
];

// ─── HELPERS ─────────────────────────────────────────────────
const sum = (arr, k) => arr.reduce((a, i) => a + i[k], 0);
const calcDay = (m) => m.reduce((a, meal) => {
  a.p += sum(meal.items, "p"); a.c += sum(meal.items, "c");
  a.f += sum(meal.items, "f"); a.cal += sum(meal.items, "cal"); return a;
}, { p: 0, c: 0, f: 0, cal: 0 });

export default function Protocol() {
  const [tab, setTab] = useState("schedule");
  const [day, setDay] = useState(T);
  const [openMeal, setOpenMeal] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [showDOD, setShowDOD] = useState(false);

  const current = meals[day];
  const totals = calcDay(current);
  const tTot = calcDay(meals[T]);
  const rTot = calcDay(meals[R]);
  const wDay = weekDays[activeDay];

  const tabs = [
    { id: "schedule", label: "Schedule" },
    { id: "workout", label: "Workout" },
    { id: "meals", label: "Meals" },
    { id: "supplements", label: "Supps" },
    { id: "macros", label: "Macros" },
    { id: "grocery", label: "Grocery" },
    { id: "swaps", label: "Swaps" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#07080A", color: "#EAE8E2", fontFamily: "'Palatino Linotype', Palatino, serif", overflowX: "hidden" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(170deg, #07080A 0%, #0C100D 50%, #09080C 100%)", borderBottom: "1px solid #161719", padding: "32px 22px 26px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 0% 100%, rgba(58,143,92,0.08) 0%, transparent 55%), radial-gradient(ellipse at 100% 0%, rgba(184,64,64,0.06) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.025, backgroundImage: "linear-gradient(#EAE8E2 1px, transparent 1px), linear-gradient(90deg, #EAE8E2 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div style={{ maxWidth: 880, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 5 }}>
              {["#3A8F5C", "#C8943A", "#B84040", "#4A72D4"].map(c => (
                <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c, boxShadow: `0 0 7px ${c}` }} />
              ))}
            </div>
            <span style={{ fontSize: 9, letterSpacing: "0.26em", color: "#3A8F5C", fontFamily: "monospace" }}>TUNDE · 185 LBS · 4 AM FASTED PROTOCOL · DO OR DIE</span>
          </div>
          <div style={{ marginBottom: 12 }}>
            <h1 style={{ fontSize: "clamp(26px, 5.5vw, 50px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.0, margin: "0 0 4px", fontStyle: "italic" }}>Ultimate</h1>
            <h1 style={{ fontSize: "clamp(26px, 5.5vw, 50px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.0, margin: 0, color: "#3A8F5C" }}>Physique</h1>
          </div>
          <p style={{ color: "#343638", fontSize: 12, margin: "0 0 22px", maxWidth: 540, lineHeight: 1.7 }}>
            Nutrition · Supplements · Training · Recovery — unified into one daily operating system. Built around the 4 AM fasted warrior schedule and the Do or Die methodology.
          </p>
          <div style={{ display: "inline-flex", marginBottom: 20, border: "1px solid #1A1C1E", borderRadius: 6, overflow: "hidden" }}>
            {[{ id: T, l: "🏋️  Training Day" }, { id: R, l: "😴  Rest Day" }].map(d => (
              <button key={d.id} onClick={() => { setDay(d.id); setOpenMeal(null); }} style={{ padding: "8px 18px", background: day === d.id ? "#3A8F5C" : "transparent", border: "none", color: day === d.id ? "#07080A" : "#343638", fontSize: 11, cursor: "pointer", fontFamily: "monospace", letterSpacing: "0.07em", transition: "all 0.2s", fontWeight: day === d.id ? 700 : 400 }}>{d.l}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap", borderTop: "1px solid #161719", paddingTop: 18 }}>
            {[
              { label: "Window", val: "8 hrs", sub: "9AM–5PM", c: "#3A8F5C" },
              { label: "Calories", val: totals.cal.toLocaleString(), sub: "kcal", c: "#EAE8E2" },
              { label: "Protein", val: totals.p + "g", sub: Math.round(totals.p*4/totals.cal*100)+"%", c: "#B84040" },
              { label: "Carbs", val: totals.c + "g", sub: Math.round(totals.c*4/totals.cal*100)+"%", c: "#C8943A" },
              { label: "Fats", val: totals.f + "g", sub: Math.round(totals.f*9/totals.cal*100)+"%", c: "#4A72D4" },
            ].map((s, i) => (
              <div key={s.label} style={{ paddingRight: 22, marginRight: 22, borderRight: i < 4 ? "1px solid #161719" : "none", marginBottom: 6 }}>
                <div style={{ fontSize: 8, color: "#242628", letterSpacing: "0.2em", fontFamily: "monospace", textTransform: "uppercase", marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 18, color: "#EAE8E2" }}>{s.val}</div>
                <div style={{ fontSize: 9, color: s.c, fontFamily: "monospace" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ borderBottom: "1px solid #161719", background: "#090A0C", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", overflowX: "auto" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "12px 14px", background: "none", border: "none", color: tab === t.id ? "#3A8F5C" : "#282A2C", fontSize: 10, cursor: "pointer", letterSpacing: "0.14em", fontFamily: "monospace", textTransform: "uppercase", borderBottom: tab === t.id ? "2px solid #3A8F5C" : "2px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "26px 18px 60px" }}>

        {/* ══ SCHEDULE ══ */}
        {tab === "schedule" && (
          <div>
            <div style={{ fontSize: 9, color: "#3A8F5C", letterSpacing: "0.22em", fontFamily: "monospace", marginBottom: 22 }}>24-HOUR DAILY BLUEPRINT</div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 18, top: 8, bottom: 8, width: 1, background: "linear-gradient(to bottom, #6B4FBB40, #B8404040, #C8943A40, #3A8F5C40, #4A72D440, #16171940)" }} />
              {[
                { t: "4:00 AM", icon: "🙏", l: "Wake · Prayer · Pre-Training Stack", c: "#6B4FBB", b: "B12 sublingual under tongue. Vitality + Fermented Beet Root + Black Maca. Mix Pre-Workout. Prayer and intention — the foundation of the protocol." },
                { t: "4:15 AM", icon: "⚡", l: "Pre-Workout Loaded", c: "#6B4FBB", b: "Drink Bulk Pre-Workout. Citrulline + beta-alanine + betaine hit the bloodstream. Nitric oxide from beet root begins activating. Fasted state amplifies every compound." },
                { t: "4:30 AM", icon: "🏋️", l: "Do or Die Circuit Begins", c: "#B84040", b: "The Do or Die circuit opens every session: 100-rep sets across 14 movements + full push-up variation ladder. This is the foundation — grit before the structured session begins." },
                { t: "5:30 AM", icon: "💪", l: "Main Session — Day-Specific Training", c: "#B84040", b: "Mon: Upper Strength · Tue: Lower Power · Wed: Operator Circuit · Thu: Hypertrophy · Fri: Posterior Chain · Sat: Full-Body Circuit. Sip electrolytes throughout." },
                { t: "8:00 AM", icon: "☕", l: "Training Ends · Coffee + L-Theanine", c: "#C8943A", b: "200mg L-Theanine with black coffee. The sharpest focus window of the day. Fast continues. Fat oxidation at its peak. This is prime time for deep work." },
                { t: "9:00 AM", icon: "🍳", l: "Break Fast — Meal 1 + Morning Supps", c: "#3A8F5C", b: "Eggs + whey + oats + banana + berries + spinach. D3/K2 drops and DHT Blocker taken here with food fat. The anabolic window is fully open — do not delay past 9:30." },
                { t: "12:00 PM", icon: "⚡", l: "Meal 2 — Performance Lunch", c: "#3A8F5C", b: "Chicken + rice + kale + broccoli + purple cabbage + avocado + sauerkraut. Peak insulin sensitivity. Largest carb intake opportunity outside of post-workout." },
                { t: "2:30 PM", icon: "🍓", l: "Meal 3 — Fruit + Protein Snack", c: "#B84040", b: "Greek yogurt + mango + kiwi + pomegranate + walnuts. Micronutrient and anti-inflammatory hit. Kiwi reduces tomorrow's DOMS. Eat 2+ hrs before the 5 PM cutoff." },
                { t: "4:30 PM", icon: "🌿", l: "Meal 4 — Last Meal by 5 PM", c: "#6B4FBB", b: "Salmon + sweet potato + asparagus + bell pepper + spinach + turmeric. This meal is doing two jobs: recovering from today and fueling tomorrow's 4 AM session." },
                { t: "5:00 PM", icon: "🔒", l: "16-Hour Fast Begins", c: "#1E2022", b: "Nothing but water, black coffee, and electrolytes until 9 AM. Every fasting hour elevates HGH, activates autophagy, and deepens fat oxidation." },
                { t: "9:30 PM", icon: "🌙", l: "Pre-Sleep Recovery Stack", c: "#4A72D4", b: "Growth powder + Magnesium Bisglycinate. HGH pulse hits 60–90 min after sleep. Magnesium deepens sleep stages. Wind down completely." },
                { t: "10:00 PM", icon: "😴", l: "Sleep — Lights Out", c: "#4A72D4", b: "6 hours to 4 AM. Sleep quality is your primary recovery variable. The Do or Die program demands it. Every rep is rebuilt during these hours." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 4, position: "relative" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: item.c === "#1E2022" ? "#101214" : item.c + "14", border: `1px solid ${item.c === "#1E2022" ? "#1A1C1E" : item.c + "28"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, zIndex: 1 }}>{item.icon}</div>
                  <div style={{ flex: 1, padding: "10px 14px", marginBottom: 5, background: "#0B0C0E", border: `1px solid ${item.c === "#1E2022" ? "#131416" : item.c + "14"}`, borderRadius: 9 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 5, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, color: item.c === "#1E2022" ? "#282A2C" : item.c, fontFamily: "monospace", fontWeight: 700 }}>{item.t}</span>
                      <span style={{ fontSize: 12, color: "#6A6C6E" }}>{item.l}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#303234", lineHeight: 1.7 }}>{item.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ WORKOUT ══ */}
        {tab === "workout" && (
          <div>
            <div style={{ fontSize: 9, color: "#3A8F5C", letterSpacing: "0.22em", fontFamily: "monospace", marginBottom: 16 }}>DO OR DIE — 7-DAY TRAINING SPLIT</div>

            {/* Day selector */}
            <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
              {weekDays.map((d, i) => (
                <button key={i} onClick={() => setActiveDay(i)} style={{
                  padding: "8px 14px", borderRadius: 8, border: `1px solid ${activeDay === i ? d.color + "50" : "#161719"}`,
                  background: activeDay === i ? d.color + "14" : "#0B0C0E",
                  color: activeDay === i ? d.color : "#343638", fontSize: 11, cursor: "pointer",
                  fontFamily: "monospace", letterSpacing: "0.06em", transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 8, opacity: 0.7, marginBottom: 1 }}>{d.day.toUpperCase()}</div>
                  <div style={{ fontSize: 10 }}>{d.emoji} {d.tag}</div>
                </button>
              ))}
            </div>

            {/* Day detail */}
            <div style={{ border: `1px solid ${wDay.color}30`, borderRadius: 14, overflow: "hidden" }}>
              {/* Header */}
              <div style={{ padding: "20px 22px", background: wDay.color + "10", borderBottom: `1px solid ${wDay.color}18` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 9, color: wDay.color, fontFamily: "monospace", letterSpacing: "0.2em", marginBottom: 6 }}>{wDay.day.toUpperCase()} · {wDay.tag}</div>
                    <div style={{ fontSize: 20, color: "#EAE8E2", marginBottom: 4 }}>{wDay.emoji} {wDay.type}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {wDay.muscleGroups.map(g => (
                        <span key={g} style={{ padding: "2px 8px", borderRadius: 20, background: wDay.color + "12", border: `1px solid ${wDay.color}20`, fontSize: 9, color: wDay.color, fontFamily: "monospace" }}>{g}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "20px 22px" }}>
                {/* Do or Die */}
                {wDay.doOrDie.length > 0 && (
                  <div style={{ marginBottom: 22 }}>
                    <button onClick={() => setShowDOD(!showDOD)} style={{ width: "100%", padding: "12px 16px", background: "#0E0F11", border: "1px solid #1A1C1E", borderRadius: 10, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showDOD ? 10 : 0 }}>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 9, color: "#B84040", fontFamily: "monospace", letterSpacing: "0.16em", marginBottom: 3 }}>DO OR DIE CIRCUIT — OPENS EVERY SESSION</div>
                        <div style={{ fontSize: 12, color: "#5A5C5E" }}>27 movements · 100-rep sets + push-up ladder</div>
                      </div>
                      <span style={{ color: "#282A2C", fontSize: 18 }}>{showDOD ? "−" : "+"}</span>
                    </button>
                    {showDOD && (
                      <div style={{ background: "#0B0C0E", border: "1px solid #B8404018", borderRadius: 10, padding: "14px 16px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 6 }}>
                          {wDay.doOrDie.map((ex, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #0E0F11" }}>
                              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#B84040", flexShrink: 0 }} />
                              <span style={{ fontSize: 11, color: "#484A4C" }}>{ex}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Circuit note */}
                {wDay.circuitNote && (
                  <div style={{ padding: "12px 14px", background: wDay.color + "0A", border: `1px solid ${wDay.color}18`, borderRadius: 9, marginBottom: 16, fontSize: 12, color: "#4A4C4E" }}>
                    <span style={{ color: wDay.color, fontFamily: "monospace", fontSize: 8, letterSpacing: "0.12em" }}>CIRCUIT FORMAT  </span>{wDay.circuitNote}
                  </div>
                )}

                {/* Exercises table */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 9, color: wDay.color, letterSpacing: "0.16em", fontFamily: "monospace", marginBottom: 10 }}>MAIN SESSION</div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #141516" }}>
                          {["Exercise", "Sets", "Reps", "Rest", "Focus"].map(h => (
                            <th key={h} style={{ padding: "6px 8px", textAlign: "left", fontSize: 8, color: "#242628", fontFamily: "monospace", letterSpacing: "0.1em", fontWeight: 400 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {wDay.exercises.map((ex, i) => (
                          <tr key={i} style={{ borderBottom: "1px solid #0D0E10" }}>
                            <td style={{ padding: "10px 8px", fontSize: 12, color: "#9A9890" }}>{ex.name}</td>
                            <td style={{ padding: "10px 8px", fontSize: 12, color: wDay.color, fontFamily: "monospace", textAlign: "center" }}>{ex.sets}</td>
                            <td style={{ padding: "10px 8px", fontSize: 12, color: "#C8943A", fontFamily: "monospace" }}>{ex.reps}</td>
                            <td style={{ padding: "10px 8px", fontSize: 11, color: "#404244", fontFamily: "monospace", whiteSpace: "nowrap" }}>{ex.rest}</td>
                            <td style={{ padding: "10px 8px", fontSize: 10, color: "#343638" }}>{ex.focus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Nutrition + Supp notes */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ padding: "12px 14px", background: "#0E0F11", border: "1px solid #3A8F5C16", borderRadius: 9 }}>
                    <div style={{ fontSize: 8, color: "#3A8F5C", fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 6 }}>NUTRITION NOTE</div>
                    <div style={{ fontSize: 11, color: "#404244", lineHeight: 1.65 }}>{wDay.nutrition}</div>
                  </div>
                  <div style={{ padding: "12px 14px", background: "#0E0F11", border: "1px solid #6B4FBB16", borderRadius: 9 }}>
                    <div style={{ fontSize: 8, color: "#6B4FBB", fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 6 }}>SUPPLEMENT NOTE</div>
                    <div style={{ fontSize: 11, color: "#404244", lineHeight: 1.65 }}>{wDay.suppNote}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly volume summary */}
            <div style={{ marginTop: 14, padding: "16px 18px", background: "#0B0C0E", border: "1px solid #161719", borderRadius: 12 }}>
              <div style={{ fontSize: 9, color: "#3A8F5C", letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 12 }}>WEEKLY TRAINING STRUCTURE</div>
              <div style={{ display: "grid", gap: 7 }}>
                {weekDays.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 10, color: d.color, fontFamily: "monospace", minWidth: 80 }}>{d.day}</span>
                    <div style={{ flex: 1, height: 3, background: "#141516", borderRadius: 2 }}>
                      <div style={{ height: "100%", width: d.tag === "RECOVERY" ? "20%" : d.tag === "CONDITIONING" || d.tag === "OPERATOR" ? "60%" : "100%", background: d.color, borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 10, color: "#343638", fontFamily: "monospace", minWidth: 120 }}>{d.emoji} {d.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ MEALS ══ */}
        {tab === "meals" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[{ id: T, l: "Training Day", d: tTot, c: "#3A8F5C" }, { id: R, l: "Rest Day", d: rTot, c: "#6B4FBB" }].map(x => (
                <div key={x.id} onClick={() => { setDay(x.id); setOpenMeal(null); }} style={{ padding: "14px 16px", borderRadius: 10, cursor: "pointer", background: day === x.id ? x.c + "10" : "#0B0C0E", border: `1px solid ${day === x.id ? x.c + "35" : "#161719"}`, transition: "all 0.2s" }}>
                  <div style={{ fontSize: 9, color: day === x.id ? x.c : "#282A2C", fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 5 }}>{x.l.toUpperCase()}</div>
                  <div style={{ fontSize: 22, color: "#EAE8E2", marginBottom: 3 }}>{x.d.cal.toLocaleString()} <span style={{ fontSize: 10, color: "#303234" }}>kcal</span></div>
                  <div style={{ fontSize: 10, color: "#303234", fontFamily: "monospace" }}>{x.d.p}g P · {x.d.c}g C · {x.d.f}g F</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", marginBottom: 20, background: "#0B0C0E", border: "1px solid #161719", borderRadius: 9, overflow: "hidden" }}>
              {[{ l: "FAST", t: "5 PM → 9 AM · 16 hrs", flex: 3, c: "#1E2022" }, { l: "EAT", t: "9 AM → 5 PM · 8 hrs", flex: 2, c: "#3A8F5C" }].map(s => (
                <div key={s.l} style={{ flex: s.flex, padding: "10px 14px", borderRight: "1px solid #161719", background: s.l === "EAT" ? "#3A8F5C08" : "transparent" }}>
                  <div style={{ fontSize: 8, color: s.c, fontFamily: "monospace", letterSpacing: "0.2em", marginBottom: 2 }}>{s.l}</div>
                  <div style={{ fontSize: 11, color: s.l === "EAT" ? "#6A6C6E" : "#222426" }}>{s.t}</div>
                </div>
              ))}
            </div>

            {current.map(meal => {
              const mt = { p: sum(meal.items, "p"), c: sum(meal.items, "c"), f: sum(meal.items, "f"), cal: sum(meal.items, "cal") };
              const isOpen = openMeal === meal.id;
              return (
                <div key={meal.id} style={{ marginBottom: 8, border: `1px solid ${isOpen ? meal.color + "30" : "#161719"}`, borderRadius: 12, overflow: "hidden", background: isOpen ? "#0C0D0F" : "#0B0C0E", transition: "border-color 0.2s" }}>
                  <div onClick={() => setOpenMeal(isOpen ? null : meal.id)} style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 9, background: meal.color + "14", border: `1px solid ${meal.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{meal.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
                        <span style={{ fontSize: 8, color: meal.color, fontFamily: "monospace", letterSpacing: "0.16em" }}>{meal.label}</span>
                        <span style={{ fontSize: 8, color: "#1E2022" }}>·</span>
                        <span style={{ fontSize: 8, color: "#2C2E30", fontFamily: "monospace" }}>{meal.time}</span>
                      </div>
                      <div style={{ fontSize: 13, color: "#EAE8E2" }}>{meal.title}</div>
                      <div style={{ fontSize: 10, color: "#2C2E30", marginTop: 1 }}>{meal.sub}</div>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      {[{ l: "P", v: mt.p, c: "#B84040" }, { l: "C", v: mt.c, c: "#C8943A" }, { l: "F", v: mt.f, c: "#4A72D4" }].map(m => (
                        <div key={m.l} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: 7, color: m.c, fontFamily: "monospace" }}>{m.l}</div>
                          <div style={{ fontSize: 11, color: "#7A7870", fontFamily: "monospace" }}>{m.v}g</div>
                        </div>
                      ))}
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 7, color: "#1E2022", fontFamily: "monospace" }}>CAL</div>
                        <div style={{ fontSize: 11, color: "#EAE8E2", fontFamily: "monospace" }}>{mt.cal}</div>
                      </div>
                      <span style={{ color: "#202224", fontSize: 16, marginLeft: 4 }}>{isOpen ? "−" : "+"}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${meal.color}12`, padding: "14px 18px" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 12 }}>
                        <thead><tr style={{ borderBottom: "1px solid #141516" }}>
                          {["Ingredient", "Amount", "P", "C", "F", "Cal"].map(h => (
                            <th key={h} style={{ padding: "4px 4px", textAlign: h === "Ingredient" || h === "Amount" ? "left" : "right", fontSize: 7, color: "#202224", fontFamily: "monospace", letterSpacing: "0.1em", fontWeight: 400 }}>{h}</th>
                          ))}
                        </tr></thead>
                        <tbody>
                          {meal.items.map((item, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid #0C0D0F" }}>
                              <td style={{ padding: "7px 4px", fontSize: 11, color: "#8A8880" }}>{item.name}</td>
                              <td style={{ padding: "7px 4px", fontSize: 9, color: "#2C2E30", fontFamily: "monospace" }}>{item.amt}</td>
                              <td style={{ padding: "7px 4px", textAlign: "right", fontSize: 9, color: "#B84040", fontFamily: "monospace" }}>{item.p}</td>
                              <td style={{ padding: "7px 4px", textAlign: "right", fontSize: 9, color: "#C8943A", fontFamily: "monospace" }}>{item.c}</td>
                              <td style={{ padding: "7px 4px", textAlign: "right", fontSize: 9, color: "#4A72D4", fontFamily: "monospace" }}>{item.f}</td>
                              <td style={{ padding: "7px 4px", textAlign: "right", fontSize: 9, color: "#383A3C", fontFamily: "monospace" }}>{item.cal}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div style={{ background: meal.color + "07", border: `1px solid ${meal.color}12`, borderRadius: 7, padding: "9px 12px", marginBottom: 10, fontSize: 11, color: "#404244", lineHeight: 1.7 }}>
                        <span style={{ color: meal.color, fontFamily: "monospace", fontSize: 7, letterSpacing: "0.12em" }}>COACH NOTE  </span>{meal.note}
                      </div>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        {meal.keys.map(k => (
                          <span key={k} style={{ padding: "2px 8px", borderRadius: 20, background: "#0D0E10", border: "1px solid #161719", fontSize: 8, color: "#2C2E30", fontFamily: "monospace" }}>{k}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ══ SUPPLEMENTS ══ */}
        {tab === "supplements" && (
          <div>
            <div style={{ fontSize: 9, color: "#3A8F5C", letterSpacing: "0.22em", fontFamily: "monospace", marginBottom: 20 }}>COMPLETE SUPPLEMENT PROTOCOL — CONFLICT-FREE</div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 18, top: 8, bottom: 8, width: 1, background: "linear-gradient(to bottom, #6B4FBB40, #B8404040, #C8943A40, #3A8F5C40, #4A72D440)" }} />
              {suppSchedule.map((block, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 4, position: "relative" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: block.color + "14", border: `1px solid ${block.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, zIndex: 1 }}>{block.icon}</div>
                  <div style={{ flex: 1, padding: "10px 14px", marginBottom: 5, background: "#0B0C0E", border: `1px solid ${block.color}14`, borderRadius: 9 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, color: block.color, fontFamily: "monospace", fontWeight: 700 }}>{block.time}</span>
                      <span style={{ fontSize: 11, color: "#5A5C5E" }}>{block.label}</span>
                    </div>
                    {block.supps.map((s, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 7, paddingBottom: 7, borderBottom: j < block.supps.length - 1 ? "1px solid #0D0E10" : "none" }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: block.color, flexShrink: 0, marginTop: 4 }} />
                        <div>
                          <div style={{ fontSize: 11, color: "#A8A6A0", marginBottom: 2 }}>{s.name}</div>
                          <div style={{ fontSize: 10, color: "#2C2E30" }}>{s.note}</div>
                        </div>
                      </div>
                    ))}
                    {block.warning && <div style={{ marginTop: 6, padding: "7px 10px", background: "#C8943A0E", border: "1px solid #C8943A20", borderRadius: 6, fontSize: 10, color: "#6A5228" }}>{block.warning}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ MACROS ══ */}
        {tab === "macros" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[{ l: "Training Day", d: tTot, c: "#3A8F5C" }, { l: "Rest Day", d: rTot, c: "#6B4FBB" }].map(({ l, d, c }) => (
                <div key={l} style={{ padding: "16px", background: "#0B0C0E", border: `1px solid ${c}18`, borderRadius: 12 }}>
                  <div style={{ fontSize: 9, color: c, fontFamily: "monospace", letterSpacing: "0.14em", marginBottom: 8 }}>{l.toUpperCase()}</div>
                  <div style={{ fontSize: 26, color: "#EAE8E2", marginBottom: 12, letterSpacing: "-0.02em" }}>{d.cal.toLocaleString()} <span style={{ fontSize: 11, color: "#2C2E30" }}>kcal</span></div>
                  {[{ n: "Protein", v: d.p, c: "#B84040", m: 4 }, { n: "Carbs", v: d.c, c: "#C8943A", m: 4 }, { n: "Fat", v: d.f, c: "#4A72D4", m: 9 }].map(mac => (
                    <div key={mac.n} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: "#404244" }}>{mac.n}</span>
                        <span style={{ fontSize: 10, color: mac.c, fontFamily: "monospace" }}>{mac.v}g · {Math.round(mac.v * mac.m / d.cal * 100)}%</span>
                      </div>
                      <div style={{ height: 3, background: "#141516", borderRadius: 2 }}>
                        <div style={{ height: "100%", width: `${Math.round(mac.v * mac.m / d.cal * 100)}%`, background: mac.c, borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 18px", background: "#0B0C0E", border: "1px solid #161719", borderRadius: 12 }}>
              <div style={{ fontSize: 9, color: "#3A8F5C", letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 12 }}>WHY THESE NUMBERS FOR DO OR DIE</div>
              {[
                { t: "Do or Die demands 220g+ protein", b: "The Do or Die circuit alone creates enormous muscle protein breakdown — 100-rep sets across 27 movements, daily. High protein is not optional at this training volume. 1.2g/lb is the anti-catabolism floor." },
                { t: "High carb on Mon/Tue/Thu/Fri/Sat", b: "Do or Die + main session = 3+ hours of work. Fasted training starts with partially depleted glycogen. Full carb portions ensure you can sustain quality reps across the entire session length." },
                { t: "Wed + Sun reduced carbs", b: "Wednesday is conditioning only (no Do or Die). Sunday is mobility only. Glycogen demand is lower — reduced carbs activate fat oxidation and deepen the recovery effect." },
                { t: "Fats never drop below 100g", b: "The training volume and hormone demand of Do or Die is extreme. Testosterone, cortisol response, and tissue repair all require dietary fat. This is non-negotiable at this training level." },
              ].map(p => (
                <div key={p.t} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #0E0F10" }}>
                  <div style={{ fontSize: 11, color: "#9A9890", marginBottom: 3 }}>{p.t}</div>
                  <div style={{ fontSize: 10, color: "#2C2E30", lineHeight: 1.7 }}>{p.b}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ GROCERY ══ */}
        {tab === "grocery" && (
          <div>
            <div style={{ fontSize: 9, color: "#3A8F5C", letterSpacing: "0.22em", fontFamily: "monospace", marginBottom: 18 }}>WEEKLY GROCERY LIST — 7 DAYS</div>
            {grocery.map(cat => (
              <div key={cat.cat} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 14 }}>{cat.emoji}</span>
                  <span style={{ fontSize: 12, color: "#EAE8E2" }}>{cat.cat}</span>
                </div>
                <div style={{ paddingLeft: 22 }}>
                  {cat.items.map(item => (
                    <div key={item} style={{ padding: "7px 0", borderBottom: "1px solid #0D0E10", fontSize: 11, color: "#404244", display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 3, height: 3, borderRadius: "50%", border: "1px solid #1A1C1E", flexShrink: 0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: "12px 14px", background: "#0B0C0E", border: "1px solid #3A8F5C14", borderRadius: 9, fontSize: 11, color: "#2C2E30" }}>
              💡 <strong style={{ color: "#404244" }}>Sunday Prep (45 min):</strong> Batch cook chicken, rice, sweet potatoes. Roast asparagus + bell peppers. Portion into 5 containers. Wash and store all fruit. Pre-portion yogurt. Everything ready — no decisions Monday through Friday.
            </div>
          </div>
        )}

        {/* ══ SWAPS ══ */}
        {tab === "swaps" && (
          <div>
            <div style={{ fontSize: 9, color: "#3A8F5C", letterSpacing: "0.22em", fontFamily: "monospace", marginBottom: 8 }}>OPTIONAL SWAPS — SYSTEM STAYS INTACT</div>
            <div style={{ fontSize: 11, color: "#2C2E30", marginBottom: 18, lineHeight: 1.6 }}>Use when you need variety. Macros stay equivalent.</div>
            {swaps.map((s, i) => (
              <div key={i} style={{ padding: "12px 16px", marginBottom: 7, background: "#0B0C0E", border: "1px solid #161719", borderRadius: 9 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "#404244" }}>{s.from}</span>
                  <span style={{ color: "#1A1C1E", fontSize: 12 }}>→</span>
                  <span style={{ fontSize: 12, color: "#9A9890" }}>{s.to}</span>
                </div>
                <div style={{ fontSize: 9, color: "#242628", fontFamily: "monospace" }}>{s.why}</div>
              </div>
            ))}
            <div style={{ marginTop: 18, padding: "18px", background: "#0B0C0E", border: "1px solid #3A8F5C14", borderRadius: 12 }}>
              <div style={{ fontSize: 9, color: "#3A8F5C", letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 8 }}>THE DO OR DIE MANDATE</div>
              <div style={{ fontSize: 12, color: "#343638", lineHeight: 1.8 }}>
                The name says it all. This protocol does not accommodate excuses. 4 AM is not negotiable. The Do or Die circuit opens every session — 100 reps is the entry fee. The food and supplements exist to support the training. Execute the system for 90 days. The body that's possible from this protocol cannot be argued with.
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-track { background: #07080A; }
        ::-webkit-scrollbar-thumb { background: #1A1C1E; border-radius: 2px; }
        button:focus { outline: none; }
      `}</style>
    </div>
  );
}
