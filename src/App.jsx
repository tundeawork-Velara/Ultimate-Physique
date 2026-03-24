import { useState } from "react";

const T = "training";
const R = "rest";

const weekDays = [
  { day:"Monday",type:"Upper Body Max Strength",emoji:"💪",color:"#B84040",tag:"STRENGTH",
    doOrDie:["100 Reverse Plank","100 Rear Delt Flys","100 Reverse Nordics","100 Side-to-Side Plank Reach","100 Pistol Squats","100 Nordic Hamstring Curls","100 Neck Curls / Extensions","100 Reverse Curls","100 Ab Wheel","100 Curls (variations)","100 Hip Thrust Bridges","100 Leg Raises","100 Tricep Extensions","100 Flys","Standard Push-Ups × 30","100 Pike Push-Ups","Close-Grip Push-Ups × 25","Decline Push-Ups × 25","Explosive Push-Ups × 20","Diamond Push-Ups × 20","Incline Push-Ups × 20","Wide Push-Ups × 20","Incline (small) × 20","Archer Push-Ups × 20","Tempo Push-Ups (3 sec down) × 20","Pseudo Planche Push-Ups × 20","Close-Grip Push-Ups × 20"],
    exercises:[{name:"Weighted Pull-Ups (or Backpack Pull-Ups)",sets:5,reps:"10",rest:"3 min",focus:"Back width + bicep strength"},{name:"Weighted Dips (or Chair Dips + Weight)",sets:5,reps:"10",rest:"2–3 min",focus:"Chest + tricep compound"},{name:"Overhead Press (DBs / Barbell)",sets:5,reps:"10",rest:"2–3 min",focus:"Shoulder max strength"},{name:"One-Arm DB Row",sets:5,reps:"10/arm",rest:"2 min",focus:"Mid-back thickness"},{name:"Hanging Knee / Leg Raises",sets:5,reps:"25",rest:"1 min",focus:"Core + hip flexors"},{name:"Farmer Carries (Heavy DBs / Bags)",sets:5,reps:"40 sec",rest:"1 min",focus:"Grip + traps + core stability"},{name:"Bench Press (heavy)",sets:5,reps:"10",rest:"2 min",focus:"Chest max strength"},{name:"Close-Grip Bench (heavy)",sets:5,reps:"10",rest:"2 min",focus:"Tricep strength + inner chest"}],
    nutrition:"Highest carb day. Banana at Meal 1 non-negotiable. Rice at full 180g. Sweet potato 180g tonight.",
    suppNote:"Full pre-workout at 4 AM. Creatine most impactful on strength days. Post-workout whey within 30 min.",
    muscleGroups:["Chest","Back","Shoulders","Triceps","Biceps","Core"] },
  { day:"Tuesday",type:"Lower Body Strength & Power",emoji:"🦵",color:"#C8943A",tag:"POWER",
    doOrDie:["100 Reverse Plank","100 Rear Delt Flys","100 Reverse Nordics","100 Side-to-Side Plank Reach","100 Pistol Squats","100 Nordic Hamstring Curls","100 Neck Curls / Extensions","100 Reverse Curls","100 Ab Wheel","100 Curls (variations)","100 Hip Thrust Bridges","100 Leg Raises","100 Tricep Extensions","100 Flys","Standard Push-Ups × 30","100 Pike Push-Ups","Close-Grip Push-Ups × 25","Decline Push-Ups × 25","Explosive Push-Ups × 20","Diamond Push-Ups × 20","Incline Push-Ups × 20","Wide Push-Ups × 20","Incline (small) × 20","Archer Push-Ups × 20","Tempo Push-Ups (3 sec down) × 20","Pseudo Planche Push-Ups × 20","Close-Grip Push-Ups × 20"],
    exercises:[{name:"Back Squat (DB Goblet if no rack)",sets:5,reps:"10",rest:"3 min",focus:"Quad + glute compound"},{name:"Romanian Deadlift (DBs or Barbell)",sets:5,reps:"10",rest:"2–3 min",focus:"Posterior chain — hamstrings + glutes"},{name:"Bulgarian Split Squat",sets:5,reps:"10/leg",rest:"2 min",focus:"Unilateral quad + glute balance"},{name:"Hip Thrusts (Weighted)",sets:5,reps:"10",rest:"2 min",focus:"Glute max strength"},{name:"Box Jumps / Step-Ups",sets:5,reps:"10",rest:"1–2 min",focus:"Explosive power + fast-twitch"},{name:"Bench Press (volume)",sets:5,reps:"15",rest:"3 min",focus:"Chest volume accumulation"},{name:"Incline Bench (volume)",sets:5,reps:"15",rest:"3 min",focus:"Upper chest development"}],
    nutrition:"High carb — legs demand the most glycogen. Sweet potato full 180g tonight. Banana at Meal 1.",
    suppNote:"Creatine demand highest on squat/deadlift days. Full electrolyte mix during training.",
    muscleGroups:["Quads","Hamstrings","Glutes","Calves","Core","Chest (volume)"] },
  { day:"Wednesday",type:"Tactical Conditioning",emoji:"🔥",color:"#3A8F5C",tag:"CONDITIONING",
    doOrDie:[],
    exercises:[{name:"Burpees",sets:5,reps:"20",rest:"In circuit",focus:"Full body metabolic conditioning"},{name:"Push-Ups (Wide / Close mix)",sets:5,reps:"25",rest:"In circuit",focus:"Chest + tricep endurance"},{name:"Pull-Ups (Assisted if needed)",sets:5,reps:"15",rest:"In circuit",focus:"Back + bicep endurance"},{name:"Walking Lunges (Weighted optional)",sets:5,reps:"30",rest:"In circuit",focus:"Quad + glute endurance"},{name:"200m Sprint / High-Knee Run",sets:5,reps:"1",rest:"2 min between rounds",focus:"Cardiovascular + lactate threshold"}],
    circuitNote:"5 Rounds · Operator Circuit. 2 min rest between rounds only.",
    nutrition:"Moderate carb day. Focus on hydration. Supergreens at Meal 2 especially valuable today.",
    suppNote:"Standard stack. Fermented beet root valuable for cardio output.",
    muscleGroups:["Full Body","Cardiovascular","Metabolic"] },
  { day:"Thursday",type:"Upper Body Hypertrophy",emoji:"📈",color:"#4A72D4",tag:"HYPERTROPHY",
    doOrDie:["100 Reverse Plank","100 Rear Delt Flys","100 Reverse Nordics","100 Side-to-Side Plank Reach","100 Pistol Squats","100 Nordic Hamstring Curls","100 Neck Curls / Extensions","100 Reverse Curls","100 Ab Wheel","100 Curls (variations)","100 Hip Thrust Bridges","100 Leg Raises","100 Tricep Extensions","100 Flys","Standard Push-Ups × 30","100 Pike Push-Ups","Close-Grip Push-Ups × 25","Decline Push-Ups × 25","Explosive Push-Ups × 20","Diamond Push-Ups × 20","Incline Push-Ups × 20","Wide Push-Ups × 20","Incline (small) × 20","Archer Push-Ups × 20","Tempo Push-Ups (3 sec down) × 20","Pseudo Planche Push-Ups × 20","Close-Grip Push-Ups × 20"],
    exercises:[{name:"Incline DB Bench Press",sets:5,reps:"10",rest:"90 sec",focus:"Upper chest hypertrophy"},{name:"Pull-Ups / Chin-Ups",sets:5,reps:"15 / AMRAP",rest:"2 min",focus:"Back width + bicep volume"},{name:"Ring / Chair Dips",sets:5,reps:"10",rest:"2 min",focus:"Chest + tricep hypertrophy"},{name:"Face Pulls / Band Pull-Aparts",sets:5,reps:"15",rest:"1 min",focus:"Rear delt + rotator cuff health"},{name:"Hammer Curls",sets:5,reps:"15",rest:"1 min",focus:"Brachialis + brachioradialis"},{name:"Lateral Raises",sets:5,reps:"15",rest:"1 min",focus:"Medial delt width"},{name:"Speed Bench (explosive)",sets:8,reps:"5",rest:"1 min",focus:"Rate of force development"},{name:"Spoto Press (3 sec hold)",sets:5,reps:"5",rest:"1 min",focus:"Tension + bottom-position strength"}],
    nutrition:"High carb — hypertrophy day requires glycogen for volume work.",
    suppNote:"Creatine particularly valuable for the 8×5 speed bench sets.",
    muscleGroups:["Upper Chest","Back","Rear Delts","Biceps","Lateral Delts","Triceps"] },
  { day:"Friday",type:"Lower Body Power & Posterior Chain",emoji:"⚡",color:"#6B4FBB",tag:"POSTERIOR",
    doOrDie:["100 Reverse Plank","100 Rear Delt Flys","100 Reverse Nordics","100 Side-to-Side Plank Reach","100 Pistol Squats","100 Nordic Hamstring Curls","100 Neck Curls / Extensions","100 Reverse Curls","100 Ab Wheel","100 Curls (variations)","100 Hip Thrust Bridges","100 Leg Raises","100 Tricep Extensions","100 Flys","Standard Push-Ups × 30","100 Pike Push-Ups","Close-Grip Push-Ups × 25","Decline Push-Ups × 25","Explosive Push-Ups × 20","Diamond Push-Ups × 20","Incline Push-Ups × 20","Wide Push-Ups × 20","Incline (small) × 20","Archer Push-Ups × 20","Tempo Push-Ups (3 sec down) × 20","Pseudo Planche Push-Ups × 20","Close-Grip Push-Ups × 20"],
    exercises:[{name:"Front Squat (DB Goblet or Barbell)",sets:5,reps:"10",rest:"3 min",focus:"Quad dominance + core stability"},{name:"Romanian Deadlift",sets:5,reps:"10",rest:"2–3 min",focus:"Hamstring + glute stretch strength"},{name:"Hip Thrusts",sets:5,reps:"10",rest:"2 min",focus:"Glute activation + posterior power"},{name:"Broad Jumps / Step Jumps",sets:5,reps:"10",rest:"1–2 min",focus:"Horizontal explosive power"},{name:"Farmer Carries",sets:5,reps:"40 sec",rest:"1 min",focus:"Grip + traps + stabilizers"},{name:"Paused Bench (5 sec hold)",sets:5,reps:"5",rest:"1 min",focus:"Eccentric control + explosive concentric"},{name:"Press (no shoulder extension)",sets:5,reps:"5",rest:"1 min",focus:"Shoulder joint health"}],
    nutrition:"High carb — last high-carb meal of the week. Posterior chain burns enormous glycogen.",
    suppNote:"Magnesium at 9:30 PM especially important tonight — supports weekend recovery.",
    muscleGroups:["Quads","Hamstrings","Glutes","Posterior Chain","Grip","Shoulders"] },
  { day:"Saturday",type:"Full-Body Operator Circuit",emoji:"🎖️",color:"#B84040",tag:"OPERATOR",
    doOrDie:[],
    exercises:[{name:"400m Run / Stair Run",sets:5,reps:"1",rest:"In circuit",focus:"Aerobic capacity + leg endurance"},{name:"Burpees",sets:5,reps:"20",rest:"In circuit",focus:"Full body explosive conditioning"},{name:"Pull-Ups",sets:5,reps:"15",rest:"In circuit",focus:"Back + bicep endurance"},{name:"Goblet Squats",sets:5,reps:"20",rest:"In circuit",focus:"Quad + glute metabolic work"},{name:"Kettlebell / DB Swings",sets:5,reps:"20",rest:"In circuit",focus:"Hip hinge + posterior chain power"},{name:"40m Weighted Carry",sets:5,reps:"1",rest:"2 min between rounds",focus:"Loaded movement + mental toughness"}],
    circuitNote:"5 Rounds · Full-Body Operator Circuit. 2 min rest between rounds.",
    nutrition:"Highest aerobic demand — full banana, full carb portions throughout.",
    suppNote:"Beet root + maca potent for the 400m run sets.",
    muscleGroups:["Full Body","Cardiovascular","Grip","Core","Posterior Chain"] },
  { day:"Sunday",type:"Mobility & Active Recovery",emoji:"🧘",color:"#3A8F5C",tag:"RECOVERY",
    doOrDie:[],
    exercises:[{name:"Full-Body Stretching / Yoga Flow",sets:1,reps:"60 min",rest:"—",focus:"Fascia release + joint mobility"},{name:"Band Shoulder & Rotator Cuff Work",sets:3,reps:"15–20/direction",rest:"30 sec",focus:"Shoulder health"},{name:"Plank Variations",sets:4,reps:"60 sec each",rest:"30 sec",focus:"Core stability without spinal load"},{name:"Optional Light Swim or Walk",sets:1,reps:"20–30 min",rest:"—",focus:"Active recovery + lymphatic drainage"}],
    nutrition:"Rest day macros. Lowest carbs. Cellular repair and autophagy day.",
    suppNote:"Skip Pre-Workout. Growth + Magnesium at 9:30 PM — muscle is actually built tonight.",
    muscleGroups:["Mobility","Rotator Cuff","Core","Recovery"] },
];

const meals = {
  [T]: [
    { id:"m1",time:"9:00 AM",label:"MEAL 1",title:"Post-Workout Recovery Breakfast",sub:"Break the fast · Anabolic window · Largest meal",emoji:"🍳",color:"#C8943A",
      items:[{name:"Whole eggs",amt:"3 large (150g)",p:18,c:1,f:15,cal:210},{name:"Egg whites",amt:"5 whites (150g)",p:18,c:1,f:0,cal:75},{name:"Grass-Fed Whey Isolate",amt:"1 scoop (~30g)",p:25,c:3,f:2,cal:130},{name:"Rolled oats (dry)",amt:"80g",p:10,c:54,f:5,cal:300},{name:"Banana",amt:"1 medium (120g)",p:1,c:27,f:0,cal:105},{name:"Blueberries",amt:"80g",p:1,c:11,f:0,cal:46},{name:"Ground flaxseed",amt:"15g",p:2,c:3,f:6,cal:74},{name:"Baby spinach (raw)",amt:"40g",p:1,c:1,f:0,cal:9},{name:"Extra virgin olive oil",amt:"1 tsp (5g)",p:0,c:0,f:5,cal:40}],
      note:"Vitality (2 caps) taken here with Meal 1 fat — eggs + olive oil unlocks Quercetin & DIM. 5× better than fasted.",
      keys:["Glycogen replenishment (banana + oats)","Anti-inflammatory (blueberries)","Omega-3 (flax)","Complete protein (eggs + whey)"] },
    { id:"m2",time:"12:00 PM",label:"MEAL 2",title:"Performance Lunch + Supergreens",sub:"Peak insulin sensitivity · Protein + veggie anchor · Supergreens with water",emoji:"⚡",color:"#3A8F5C",
      items:[{name:"Chicken breast (cooked)",amt:"220g",p:68,c:0,f:4,cal:307},{name:"White rice (cooked)",amt:"180g",p:3,c:40,f:0,cal:180},{name:"Broccoli (steamed)",amt:"120g",p:3,c:7,f:0,cal:41},{name:"Kale (wilted)",amt:"80g",p:3,c:6,f:1,cal:43},{name:"Purple cabbage (raw)",amt:"60g",p:1,c:4,f:0,cal:20},{name:"Avocado",amt:"½ medium (75g)",p:1,c:4,f:11,cal:112},{name:"Sauerkraut (raw)",amt:"60g",p:1,c:2,f:0,cal:11},{name:"Zena Greens Supergreens (1 stick)",amt:"~11g stick pack",p:1,c:3,f:0,cal:15},{name:"Lemon + garlic + pepper",amt:"to taste",p:0,c:1,f:0,cal:5}],
      note:"Mix supergreens stick in 8–12oz water alongside the meal. Probiotics activate in the fed gut state. Antioxidants compound with sulforaphane from broccoli + kale for a stacked anti-inflammatory effect. Sauerkraut always cold.",
      keys:["Probiotics (supergreens + sauerkraut)","Sulforaphane + antioxidant stack (broccoli + greens)","70+ superfoods (Zena Greens)","Healthy fat (avocado)"] },
    { id:"m3",time:"2:30 PM",label:"MEAL 3",title:"Fruit + Protein Snack",sub:"Micronutrient hit · Sustained energy mid-window",emoji:"🍓",color:"#B84040",
      items:[{name:"Greek yogurt (plain, full-fat)",amt:"200g",p:20,c:8,f:10,cal:200},{name:"Mango (diced)",amt:"100g",p:1,c:25,f:0,cal:99},{name:"Kiwi (sliced)",amt:"2 medium (148g)",p:2,c:18,f:1,cal:90},{name:"Pomegranate seeds",amt:"50g",p:1,c:9,f:0,cal:41},{name:"Walnuts (raw)",amt:"20g",p:5,c:4,f:13,cal:131},{name:"Ground cinnamon",amt:"¼ tsp",p:0,c:0,f:0,cal:2}],
      note:"Kiwi reduces DOMS. Pomegranate ellagic acid reduces muscle damage markers.",
      keys:["DOMS reduction (kiwi)","Muscle recovery (pomegranate)","Beta-carotene (mango)","ALA omega-3 (walnuts)"] },
    { id:"m4",time:"4:30 PM",label:"MEAL 4",title:"Last Meal — Overnight Fuel",sub:"Eaten by 5:00 PM · Fuels tomorrow's 4 AM session",emoji:"🌿",color:"#6B4FBB",
      items:[{name:"Salmon fillet (cooked)",amt:"200g",p:40,c:0,f:20,cal:350},{name:"Sweet potato (baked)",amt:"180g",p:3,c:36,f:0,cal:154},{name:"Asparagus (roasted)",amt:"120g",p:3,c:5,f:0,cal:27},{name:"Spinach (wilted)",amt:"100g",p:3,c:3,f:0,cal:23},{name:"Bell peppers, mixed (roasted)",amt:"100g",p:1,c:6,f:0,cal:31},{name:"Extra virgin olive oil",amt:"1 tbsp (14g)",p:0,c:0,f:14,cal:119},{name:"Lemon + garlic + turmeric + black pepper",amt:"to taste",p:0,c:1,f:0,cal:5}],
      note:"Sweet potato glycogen releases slowly overnight. Salmon EPA/DHA reduces inflammation during sleep.",
      keys:["EPA/DHA omega-3 (salmon)","Overnight glycogen (sweet potato)","Vitamin C (bell pepper)","Anti-inflammatory (turmeric)"] },
  ],
  [R]: [
    { id:"r1",time:"9:00 AM",label:"MEAL 1",title:"Morning Rebuild Breakfast",sub:"Lower carbs · Same protein · Cellular repair day",emoji:"🍳",color:"#C8943A",
      items:[{name:"Whole eggs",amt:"3 large (150g)",p:18,c:1,f:15,cal:210},{name:"Egg whites",amt:"5 whites (150g)",p:18,c:1,f:0,cal:75},{name:"Grass-Fed Whey Isolate",amt:"1 scoop (~30g)",p:25,c:3,f:2,cal:130},{name:"Rolled oats (dry)",amt:"50g",p:6,c:34,f:3,cal:187},{name:"Blueberries",amt:"80g",p:1,c:11,f:0,cal:46},{name:"Strawberries (sliced)",amt:"100g",p:1,c:8,f:0,cal:32},{name:"Ground flaxseed",amt:"15g",p:2,c:3,f:6,cal:74},{name:"Baby spinach (raw)",amt:"40g",p:1,c:1,f:0,cal:9},{name:"Extra virgin olive oil",amt:"1 tsp (5g)",p:0,c:0,f:5,cal:40}],
      note:"Rest day: oats reduced, banana swapped for strawberries. Fisetin amplifies autophagy on non-training days.",
      keys:["Fisetin + autophagy (strawberries)","Antioxidants (blueberries)","Omega-3 (flax)","Complete protein"] },
    { id:"r2",time:"12:00 PM",label:"MEAL 2",title:"Recovery Lean Plate + Supergreens",sub:"High protein · Reduced carbs · Gut health + superfoods",emoji:"🥗",color:"#3A8F5C",
      items:[{name:"Chicken breast (cooked)",amt:"230g",p:71,c:0,f:4,cal:321},{name:"Brown rice (cooked)",amt:"120g",p:2,c:26,f:1,cal:120},{name:"Broccoli (steamed)",amt:"150g",p:4,c:9,f:0,cal:51},{name:"Kale (wilted)",amt:"80g",p:3,c:6,f:1,cal:43},{name:"Cherry tomatoes",amt:"100g",p:1,c:4,f:0,cal:18},{name:"Cucumber (sliced)",amt:"100g",p:1,c:4,f:0,cal:15},{name:"Avocado",amt:"½ medium (75g)",p:1,c:4,f:11,cal:112},{name:"Sauerkraut (raw)",amt:"60g",p:1,c:2,f:0,cal:11},{name:"Zena Greens Supergreens (1 stick)",amt:"~11g stick pack",p:1,c:3,f:0,cal:15}],
      note:"Supergreens in water alongside meal. Rest day probiotics are especially valuable — gut repair peaks on low-stress days. Lycopene in cherry tomatoes protects testosterone.",
      keys:["Lycopene (tomatoes)","Probiotics (supergreens + sauerkraut)","Sulforaphane (broccoli + kale)","70+ superfoods"] },
    { id:"r3",time:"2:30 PM",label:"MEAL 3",title:"Low-Carb Fruit + Fat Snack",sub:"Fat-dominant · Zinc-rich · No training carb load",emoji:"🍇",color:"#B84040",
      items:[{name:"Greek yogurt (plain, full-fat)",amt:"200g",p:20,c:8,f:10,cal:200},{name:"Mixed berries",amt:"150g",p:2,c:18,f:1,cal:85},{name:"Walnuts (raw)",amt:"25g",p:6,c:4,f:16,cal:164},{name:"Pumpkin seeds (raw)",amt:"20g",p:5,c:3,f:6,cal:88},{name:"Ground cinnamon",amt:"¼ tsp",p:0,c:0,f:0,cal:2}],
      note:"Pumpkin seeds: richest plant zinc source — supports testosterone and overnight recovery.",
      keys:["Zinc (pumpkin seeds)","Ellagic acid (raspberries)","ALA omega-3 (walnuts)","Insulin regulation (cinnamon)"] },
    { id:"r4",time:"4:30 PM",label:"MEAL 4",title:"Last Meal — Overnight Fuel",sub:"Reduced carbs · Rest day · Fast begins 5 PM",emoji:"🌿",color:"#6B4FBB",
      items:[{name:"Salmon fillet (cooked)",amt:"200g",p:40,c:0,f:20,cal:350},{name:"Sweet potato (baked)",amt:"120g",p:2,c:24,f:0,cal:103},{name:"Asparagus (roasted)",amt:"150g",p:4,c:6,f:0,cal:34},{name:"Zucchini (roasted)",amt:"120g",p:2,c:4,f:0,cal:21},{name:"Spinach (wilted)",amt:"100g",p:3,c:3,f:0,cal:23},{name:"Bell peppers, mixed (roasted)",amt:"100g",p:1,c:6,f:0,cal:31},{name:"Extra virgin olive oil",amt:"1 tbsp (14g)",p:0,c:0,f:14,cal:119},{name:"Lemon + garlic + turmeric + black pepper",amt:"to taste",p:0,c:1,f:0,cal:5}],
      note:"Reduced sweet potato on rest day. Zucchini adds manganese — cofactor for superoxide dismutase.",
      keys:["EPA/DHA omega-3 (salmon)","Manganese (zucchini)","Vitamin C (bell pepper)","Anti-inflammatory (turmeric)"] },
  ],
};

const suppSchedule = [
  { time:"4:00 AM",icon:"🙏",label:"Wake · Prayer · Pre-Training Stack",color:"#6B4FBB",
    supps:[{name:"Methylcobalamin B12 1,000mcg sublingual",note:"Dissolve under tongue first. Does not break fast."},{name:"Bulk Pre-Workout",note:"Mix and drink. Training in 15 min."},{name:"Fermented Beet Root + Black Maca",note:"Nitric oxide + adrenal support. Amplified fasted."}],warning:null },
  { time:"4:30–8:00 AM",icon:"🏋️",label:"Training — Do or Die + Main Session",color:"#B84040",
    supps:[{name:"Water + Electrolytes (sea salt + lite salt)",note:"Sip throughout. 3.5 hrs fasted = high electrolyte loss."}],warning:null },
  { time:"8:00 AM",icon:"☕",label:"Coffee + Focus Stack",color:"#C8943A",
    supps:[{name:"Black Coffee",note:"Continued fast. Amplifies fat oxidation post-training."},{name:"L-Theanine 200mg",note:"Alpha wave clarity for morning work block."}],warning:null },
  { time:"9:00 AM",icon:"🍳",label:"Break Fast — Meal 1 + Morning Supps",color:"#3A8F5C",
    supps:[{name:"Grass-Fed Whey Protein Isolate",note:"In oats or shake. Fastest leucine delivery post-fasted training."},{name:"Vitality (2 caps) — Transparent Labs ✦ MOVED HERE",note:"Fat from eggs + olive oil unlocks Quercetin & DIM. 5× better than fasted."},{name:"Vitamin D3 + K2 Drops",note:"Fat-soluble — must be taken with food. Check Vitality D3 content."},{name:"DHT Blocker / Simply Revival (2 caps)",note:"5 hrs after Vitality. Saw palmetto absorbs at normal rate."},{name:"SuperBeets Chew (optional)",note:"Separate cardiovascular nitrate dose from 4 AM beet root."}],
    warning:"⚠️ Check Vitality label D3 content. If 1,000+ IU, reduce D3 drops to 1 drop — stay under 5,000 IU daily." },
  { time:"12:00 PM",icon:"🥬",label:"Meal 2 — Supergreens",color:"#3A8F5C",
    supps:[{name:"Zena Greens Organic Supergreens (1 stick pack)",note:"Mix in 8–12oz water alongside Meal 2. Probiotics peak in fed gut state. Antioxidants compound with sulforaphane from lunch vegetables. Zero sugar — no insulin spike."}],warning:null },
  { time:"9:30 PM",icon:"🌙",label:"Pre-Sleep Recovery Stack",color:"#4A72D4",
    supps:[{name:"Growth Powder (Transparent Labs)",note:"30–60 min before sleep. Primes overnight HGH pulse."},{name:"Magnesium Bisglycinate",note:"Deepens sleep, lowers cortisol, supports testosterone synthesis."}],warning:null },
];

const grocery = [
  { cat:"Proteins",emoji:"🥩",items:["Chicken breast — 1.6kg","Salmon fillet — 1.4kg (7 × 200g)","Whole eggs — 2 dozen","Egg whites (carton) — 1L","Greek yogurt (plain, full-fat) — 1.4kg"] },
  { cat:"Fruits",emoji:"🍓",items:["Bananas — 4 medium","Blueberries — 700g","Strawberries — 400g (rest days)","Mango — 4","Kiwi — 8 medium","Pomegranate seeds — 350g","Mixed berries — 400g (rest days)"] },
  { cat:"Vegetables",emoji:"🥦",items:["Baby spinach — 1kg","Broccoli — 1kg","Kale — 600g","Asparagus — 840g","Bell peppers, mixed — 700g","Purple cabbage — 1 head","Cherry tomatoes — 700g","Cucumber — 4","Zucchini — 4","Avocados — 7","Sauerkraut (raw) — 420g"] },
  { cat:"Carbs & Starches",emoji:"🌾",items:["Rolled oats — 560g","White rice — 1kg (dry)","Brown rice — 500g (rest days)","Sweet potatoes — 1.2kg"] },
  { cat:"Healthy Fats",emoji:"🫒",items:["Extra virgin olive oil — 500ml","Walnuts (raw) — 175g","Ground flaxseed — 105g","Pumpkin seeds (raw) — 140g"] },
  { cat:"Supplements & Pantry",emoji:"🧂",items:["Zena Greens Supergreens — 7 stick packs/week","Cinnamon, turmeric, black pepper, sea salt, garlic powder","Lemons — 7","Garlic — 2 heads","Sea salt + cream of tartar (electrolytes)","Creatine monohydrate — 250g"] },
];

const swaps = [
  {from:"Chicken breast",to:"Turkey breast or 93% lean ground beef",why:"Higher zinc + iron — testosterone support"},
  {from:"Salmon",to:"Sardines or mackerel (canned in water)",why:"Higher EPA/DHA per gram, more affordable"},
  {from:"Banana",to:"2 Medjool dates",why:"Same glycogen hit, richer potassium"},
  {from:"Mango",to:"Papaya",why:"Papain enzyme aids digestion of large protein meals"},
  {from:"White rice",to:"Quinoa",why:"Complete protein — +8g protein per cup"},
  {from:"Sweet potato",to:"Butternut squash",why:"Similar carbs, very high vitamin A"},
  {from:"Greek yogurt",to:"Kefir (drinkable)",why:"3–4× more probiotic strains, same protein"},
  {from:"Walnuts",to:"Hemp seeds",why:"Complete protein + omega-3 + more zinc and iron"},
];

// ─── HAIR ───────────────────────────────────────────────────────
// Wed = Briogeo scalp exfoliation wash (no conditioner)
// Sun = Mielle shampoo + conditioner (moisture reset)
const hairDays = [
  { day:"Mon",tag:"DAILY",emoji:"🌅",color:"#C8943A",type:"Morning + Evening",focus:["Rogaine","Activator","Nightly Stack"],roll:false,washSteps:false,washType:null,
    am:[{num:"1",product:"Rogaine 5% Minoxidil Foam",instruction:"Apply to dry scalp — crown and thinning areas. Half a cap. Air dry 5–10 min.",note:"Never apply oils before this dries. Wash hands immediately."},{num:"2",product:"Copenhagen Grooming Activator",instruction:"8–10 drops to hairline, temples, edges. Massage 60 sec.",note:"Apply 10 min after Rogaine is fully dry."}],
    pm:[{num:"1",product:"The Ordinary Multi-Peptide Serum",instruction:"Apply to scalp in sections. Massage 60 sec. Do NOT rinse.",note:null},{num:"2",product:"PRSP Root Revive",instruction:"5–6 drops to scalp. Circular massage 90 sec.",note:null},{num:"3",product:"Pumpkin Seed Oil",instruction:"3–4 drops to scalp. Focus on thinning areas.",note:null},{num:"4",product:"Jojoba Oil",instruction:"Pea-sized to mid-lengths and ENDS ONLY. Not scalp.",note:"Seals moisture overnight."},{num:"5",product:"Satin Bonnet / Durag",instruction:"Cover before sleep.",note:null}] },
  { day:"Tue",tag:"DAILY",emoji:"🌅",color:"#C8943A",type:"Morning + Evening",focus:["Rogaine","Activator","Nightly Stack"],roll:false,washSteps:false,washType:null,
    am:[{num:"1",product:"Rogaine 5% Minoxidil Foam",instruction:"Apply to dry scalp. Half a cap. Air dry 5–10 min.",note:null},{num:"2",product:"Copenhagen Grooming Activator",instruction:"8–10 drops to hairline. Massage 60 sec.",note:"10 min after Rogaine dries."}],
    pm:[{num:"1",product:"The Ordinary Multi-Peptide Serum",instruction:"Apply to scalp sections. Massage 60 sec.",note:null},{num:"2",product:"PRSP Root Revive",instruction:"5–6 drops. Circular massage 90 sec.",note:null},{num:"3",product:"Pumpkin Seed Oil",instruction:"3–4 drops to scalp.",note:null},{num:"4",product:"Jojoba Oil",instruction:"Pea-sized to ends only.",note:null},{num:"5",product:"Satin Bonnet / Durag",instruction:"Cover before sleep.",note:null}] },
  { day:"Wed",tag:"WASH + ROLL",emoji:"🚿",color:"#27AE60",type:"Scalp Exfoliation + Derma Roll",focus:["Skip Rogaine","Briogeo Scalp Exfoliation","Derma Roll PM"],roll:true,washSteps:true,washType:"briogeo",
    am:[{num:"1",product:"Copenhagen Activator ONLY — skip Rogaine",instruction:"Apply to hairline/temples as normal.",note:"⚠ SKIP Rogaine this morning. Derma roll tonight = microchannels open. Resume Thursday 4 AM."}],
    prewash:[{num:"1",product:"Black Castor Oil",instruction:"Section hair. Scalp massage 5–10 min.",note:"Loosens buildup and stimulates circulation before exfoliation."},{num:"2",product:"Wait 15–20 min",instruction:"Cover with plastic cap.",note:"Castor oil primes scalp — do not skip."}],
    wash:[{num:"1",product:"Briogeo Scalp Revival — Charcoal + Coconut Oil",instruction:"Apply directly to wet scalp — do not dilute. Massage with fingertips in circular motion 3–5 min. Focus on any flaky, itchy, or buildup-prone areas.",note:"Charcoal draws out product buildup, excess oil, and scalp debris. Micro-exfoliating beads unclog follicles."},{num:"2",product:"Rinse Thoroughly",instruction:"Rinse well with warm water until water runs clear.",note:"No conditioner on Briogeo days — charcoal is clarifying, not moisturizing. LOC method provides the moisture."},{num:"3",product:"Rinse — Cool Water Final Rinse",instruction:"Finish with cool water to close the cuticle.",note:null}],
    loc:[{num:"L",product:"Camille Rose Curl Love (Leave-in)",instruction:"Apply section by section to damp hair. Rake through.",note:"Foundation moisture layer — extra important after charcoal wash."},{num:"O",product:"Jojoba Oil",instruction:"Small amount over Curl Love each section.",note:"Seals moisture in."},{num:"C",product:"Asiam DoubleButter Cream",instruction:"Apply and scrunch into each section.",note:"Final seal + curl definition."}],
    pm:[{num:"1",product:"Sanitize Roller",instruction:"Spray with 70% isopropyl alcohol. Wait 5 min.",note:"0.5mm or 0.75mm. Replace every 10–12 uses."},{num:"2",product:"Derma Roll Scalp",instruction:"Roll horizontally, vertically, diagonally. 4–5 passes per direction. Light pressure.",note:"Freshly exfoliated scalp = maximum penetration tonight."},{num:"3",product:"The Ordinary (immediately post-roll)",instruction:"Apply right after rolling — peptides penetrate 3–4× deeper.",note:"Best The Ordinary application of the week on Briogeo nights."},{num:"4",product:"Root Revive + Pumpkin Seed Oil",instruction:"Follow standard nightly order.",note:null},{num:"5",product:"Jojoba + Bonnet",instruction:"Seal ends. Cover. Sanitize roller after use.",note:null}] },
  { day:"Thu",tag:"DAILY",emoji:"🌅",color:"#C8943A",type:"Morning + Evening",focus:["Rogaine","Activator","Nightly Stack"],roll:false,washSteps:false,washType:null,
    am:[{num:"1",product:"Rogaine 5% Minoxidil Foam",instruction:"Apply to dry scalp. Half a cap. Air dry 5–10 min.",note:null},{num:"2",product:"Copenhagen Grooming Activator",instruction:"8–10 drops to hairline. Massage 60 sec.",note:null}],
    pm:[{num:"1",product:"The Ordinary Multi-Peptide Serum",instruction:"Apply to scalp sections. Massage 60 sec.",note:null},{num:"2",product:"PRSP Root Revive",instruction:"5–6 drops. Circular massage 90 sec.",note:null},{num:"3",product:"Pumpkin Seed Oil",instruction:"3–4 drops to scalp.",note:null},{num:"4",product:"Jojoba Oil",instruction:"Pea-sized to ends only.",note:null},{num:"5",product:"Satin Bonnet / Durag",instruction:"Cover before sleep.",note:null}] },
  { day:"Fri",tag:"DAILY",emoji:"🌅",color:"#C8943A",type:"Morning + Evening",focus:["Rogaine","Activator","Nightly Stack"],roll:false,washSteps:false,washType:null,
    am:[{num:"1",product:"Rogaine 5% Minoxidil Foam",instruction:"Apply to dry scalp. Half a cap. Air dry 5–10 min.",note:null},{num:"2",product:"Copenhagen Grooming Activator",instruction:"8–10 drops to hairline. Massage 60 sec.",note:null}],
    pm:[{num:"1",product:"The Ordinary Multi-Peptide Serum",instruction:"Apply to scalp sections. Massage 60 sec.",note:null},{num:"2",product:"PRSP Root Revive",instruction:"5–6 drops. Circular massage 90 sec.",note:null},{num:"3",product:"Pumpkin Seed Oil",instruction:"3–4 drops to scalp.",note:null},{num:"4",product:"Jojoba Oil",instruction:"Pea-sized to ends only.",note:null},{num:"5",product:"Satin Bonnet / Durag",instruction:"Cover before sleep.",note:null}] },
  { day:"Sat",tag:"DAILY",emoji:"🌅",color:"#C8943A",type:"Morning + Evening",focus:["Rogaine","Activator","Nightly Stack"],roll:false,washSteps:false,washType:null,
    am:[{num:"1",product:"Rogaine 5% Minoxidil Foam",instruction:"Apply to dry scalp. Half a cap. Air dry 5–10 min.",note:null},{num:"2",product:"Copenhagen Grooming Activator",instruction:"8–10 drops to hairline. Massage 60 sec.",note:null}],
    pm:[{num:"1",product:"The Ordinary Multi-Peptide Serum",instruction:"Apply to scalp sections. Massage 60 sec.",note:null},{num:"2",product:"PRSP Root Revive",instruction:"5–6 drops. Circular massage 90 sec.",note:null},{num:"3",product:"Pumpkin Seed Oil",instruction:"3–4 drops to scalp.",note:null},{num:"4",product:"Jojoba Oil",instruction:"Pea-sized to ends only.",note:null},{num:"5",product:"Satin Bonnet / Durag",instruction:"Cover before sleep.",note:null}] },
  { day:"Sun",tag:"WASH + ROLL",emoji:"💆",color:"#C8943A",type:"Moisture Reset + Derma Roll",focus:["Skip Rogaine","Mielle Shampoo + Conditioner","Derma Roll PM"],roll:true,washSteps:true,washType:"mielle",
    am:[{num:"1",product:"Copenhagen Activator ONLY — skip Rogaine",instruction:"Apply to hairline/temples as normal.",note:"⚠ SKIP Rogaine this morning. Derma roll tonight. Resume Monday 4 AM."}],
    prewash:[{num:"1",product:"Black Castor Oil",instruction:"Section hair. Scalp massage 5–10 min.",note:"Stimulates circulation and protects roots."},{num:"2",product:"Babassu Oil",instruction:"Apply to mid-lengths and ends. Comb through.",note:"Protective barrier before shampooing."},{num:"3",product:"Wait 20–30 min",instruction:"Cover with plastic cap.",note:null}],
    wash:[{num:"1",product:"Mielle Pomegranate & Honey Shampoo — Sulfate-Free",instruction:"Apply to wet scalp and hair. Work into a lather with fingertips. Massage 2–3 min. Rinse well.",note:"Sulfate-free — gentle cleanse that preserves natural oils and moisture. Formulated for Type 4."},{num:"2",product:"Mielle Pomegranate & Honey Conditioner",instruction:"Apply generously to mid-lengths and ends. Detangle with wide-tooth comb in sections. Leave 5–10 min.",note:"Deep hydration and slip for Type 4 detangling. Restores moisture after the week."},{num:"3",product:"Rinse — Cool Water",instruction:"Cool water final rinse to seal the cuticle.",note:null}],
    loc:[{num:"L",product:"Camille Rose Curl Love (Leave-in)",instruction:"Apply section by section to damp hair. Rake through.",note:"Layer over the conditioner moisture."},{num:"O",product:"Jojoba Oil",instruction:"Small amount over Curl Love each section.",note:"Seals moisture into shaft."},{num:"C",product:"Asiam DoubleButter Cream",instruction:"Apply and scrunch in.",note:"Final seal + curl definition."}],
    pm:[{num:"1",product:"Sanitize Roller",instruction:"70% isopropyl alcohol. Wait 5 min.",note:null},{num:"2",product:"Derma Roll Scalp",instruction:"Horizontal, vertical, diagonal. 4–5 passes. Light pressure.",note:null},{num:"3",product:"The Ordinary (immediately post-roll)",instruction:"Apply immediately for maximum penetration.",note:null},{num:"4",product:"Root Revive + Pumpkin Seed Oil",instruction:"Follow standard nightly order.",note:null},{num:"5",product:"Jojoba + Bonnet",instruction:"Seal ends. Cover.",note:null}] },
];

const hairRules = [
  {icon:"⚠",color:"#C0392B",text:"NEVER apply Rogaine within 24 hrs after derma rolling — skip Wed & Sun mornings."},
  {icon:"⚠",color:"#C0392B",text:"NEVER apply oils to scalp before or over Rogaine — oils block minoxidil penetration."},
  {icon:"⚠",color:"#C0392B",text:"NEVER derma roll on an unwashed scalp — wash day timing is mandatory."},
  {icon:"💡",color:"#C9A84C",text:"Wed = Briogeo (scalp exfoliation + charcoal). Sun = Mielle (moisture reset). These serve different purposes — do not swap."},
  {icon:"💡",color:"#C9A84C",text:"No conditioner on Briogeo days — charcoal wash + LOC method is sufficient. Conditioner on Mielle days only."},
  {icon:"✅",color:"#27AE60",text:"Freshly exfoliated scalp on Wednesday = best derma roll penetration of the week."},
  {icon:"✅",color:"#27AE60",text:"LOC order is non-negotiable: Leave-in → Oil → Cream. Always on damp hair."},
];

// ─── SKIN ───────────────────────────────────────────────────────
const skinDays = [
  { day:"Mon",tag:"EXFOLIATION",emoji:"🔬",color:"#3A8F5C",type:"AM Brighten + Exfoliation PM",focus:["BPO Cleanse","Vit C Stack","Glycolic PM"],
    am:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Wet face. Lather 60 sec. Rinse thoroughly.",note:"Fully rinse before any serum — residual BPO oxidizes Vitamin C."},{num:"2",product:"Vitamin C Serum (Debaiy VC)",instruction:"3–4 drops full face. Wait 3 min.",note:"AM only. Never same session as Niacinamide."},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On slightly damp skin over Vit C.",note:"Damp skin = deeper penetration."},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"3–4 drops. Focus on dark spots.",note:"Vit C + Alpha Arbutin = strongest brightening combo."},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"SPF 30+ Broad Spectrum",instruction:"Final step — every morning.",note:"⚠ Not yet in your stack. BPO + Vit C + Retinol all increase photosensitivity."}],
    pm:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Cleanse. Rinse. Pat dry.",note:"PM optional — skip if dryness occurs."},{num:"2",product:"Glycolic Acid 7% Toner",instruction:"Cotton pad, full face. Avoid eye area. Wait 10 min.",note:"OR Salicylic 2% spot only. Never both same night."},{num:"3",product:"Niacinamide 10% + Zinc 1%",instruction:"Full face after acid absorbs.",note:null},{num:"4",product:"Hyaluronic Acid Serum",instruction:"Layer over Niacinamide.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Vitamin E Oil",instruction:"2–3 drops — final step.",note:"Restores lipid barrier after acid."}] },
  { day:"Tue",tag:"RETINOL",emoji:"🧬",color:"#6B4FBB",type:"AM Brighten + Retinol Sandwich PM",focus:["BPO Cleanse","Vit C Stack","Retinol Sandwich"],
    am:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus on dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"SPF 30+",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Cleanse. Rinse. Pat dry. Wait 10–15 min.",note:"Dry time reduces retinol irritation significantly."},{num:"2",product:"Niacinamide 10% + Zinc 1%",instruction:"Full face. Wait 5 min.",note:"Sandwich step 1 — buffers retinol."},{num:"3",product:"Retinol 0.5% in Squalane",instruction:"Full face — avoid eye area.",note:"Never same night as Glycolic."},{num:"4",product:"Hyaluronic Acid Serum",instruction:"Over retinol to counteract dryness.",note:"Sandwich step 3."},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Vitamin E Oil",instruction:"Final seal.",note:null}] },
  { day:"Wed",tag:"EXFOLIATION",emoji:"🔬",color:"#3A8F5C",type:"AM Brighten + Exfoliation PM",focus:["BPO Cleanse","Vit C Stack","Glycolic PM"],
    am:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"SPF 30+",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Cleanse. Rinse.",note:null},{num:"2",product:"Glycolic Acid 7% Toner",instruction:"Cotton pad. Wait 10 min.",note:null},{num:"3",product:"Niacinamide 10% + Zinc 1%",instruction:"Full face.",note:null},{num:"4",product:"Hyaluronic Acid Serum",instruction:"Layer over Niacinamide.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Vitamin E Oil",instruction:"Final step.",note:null}] },
  { day:"Thu",tag:"RETINOL",emoji:"🧬",color:"#6B4FBB",type:"AM Brighten + Retinol Sandwich PM",focus:["BPO Cleanse","Vit C Stack","Retinol Sandwich"],
    am:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"SPF 30+",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Cleanse. Pat dry. Wait 10–15 min.",note:null},{num:"2",product:"Niacinamide 10% + Zinc 1%",instruction:"Full face. Wait 5 min.",note:null},{num:"3",product:"Retinol 0.5% in Squalane",instruction:"Full face. Avoid eye area.",note:null},{num:"4",product:"Hyaluronic Acid Serum",instruction:"Over retinol.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Vitamin E Oil",instruction:"Final seal.",note:null}] },
  { day:"Fri",tag:"EXFOLIATION",emoji:"🔬",color:"#3A8F5C",type:"AM Brighten + Exfoliation PM",focus:["BPO Cleanse","Vit C Stack","Glycolic PM"],
    am:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"SPF 30+",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Cleanse. Rinse.",note:null},{num:"2",product:"Glycolic Acid 7% Toner",instruction:"Cotton pad. Wait 10 min.",note:null},{num:"3",product:"Niacinamide 10% + Zinc 1%",instruction:"Full face.",note:null},{num:"4",product:"Hyaluronic Acid Serum",instruction:"Layer over.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Vitamin E Oil",instruction:"Final step.",note:null}] },
  { day:"Sat",tag:"RETINOL",emoji:"🧬",color:"#6B4FBB",type:"AM Brighten + Retinol Sandwich PM",focus:["BPO Cleanse","Vit C Stack","Retinol Sandwich"],
    am:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"SPF 30+",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Cleanse. Pat dry. Wait 10–15 min.",note:null},{num:"2",product:"Niacinamide 10% + Zinc 1%",instruction:"Full face. Wait 5 min.",note:null},{num:"3",product:"Retinol 0.5% in Squalane",instruction:"Full face. Avoid eye area.",note:null},{num:"4",product:"Hyaluronic Acid Serum",instruction:"Over retinol.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Vitamin E Oil",instruction:"Final seal.",note:null}] },
  { day:"Sun",tag:"MASK + REST",emoji:"🧖",color:"#B84040",type:"Barrier Rebuild + Aztec Clay Mask",focus:["BPO Cleanse","Aztec Clay Mask","Barrier Rebuild"],
    am:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"SPF 30+",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"CeraVe Acne Foaming Cream Wash (10% BPO)",instruction:"Gentle cleanse. Rinse. Pat dry.",note:null},{num:"2",product:"Aztec Clay Mask + Apple Cider Vinegar",instruction:"Mix equal parts clay + ACV to smooth paste. Apply thin layer — avoid eye area. Leave 10–15 min. Remove while still slightly damp with warm water.",note:"⚠ Remove while damp — cracking = barrier damage. NO other actives PM on mask night. 1× per week only."},{num:"3",product:"Hyaluronic Acid Serum",instruction:"Apply immediately after rinsing — skin is stripped and thirsty.",note:null},{num:"4",product:"Cetaphil Moisturizer",instruction:"Apply generously — most of the week.",note:null},{num:"5",product:"Vitamin E Oil",instruction:"Full face — most generous application of the week.",note:"Replenishes lipid barrier after deep clay treatment."},{num:"6",product:"Avjone Collagen Gold Eye Mask",instruction:"Under eyes while Vitamin E absorbs. 15–20 min.",note:null}] },
];

const skinRules = [
  {icon:"⚠",color:"#C0392B",text:"NEVER use Vitamin C and Niacinamide same session — Vit C = AM only, Niacinamide = PM only."},
  {icon:"⚠",color:"#C0392B",text:"NEVER use Retinol + Glycolic same night."},
  {icon:"⚠",color:"#C0392B",text:"NEVER use any other active PM on Aztec mask night — standalone only."},
  {icon:"⚠",color:"#C0392B",text:"SPF mandatory every morning — BPO, Vit C, Retinol, Glycolic all increase photosensitivity."},
  {icon:"💡",color:"#C9A84C",text:"Fully rinse BPO wash before any serum — residual BPO oxidizes Vitamin C."},
  {icon:"💡",color:"#C9A84C",text:"Allow 10–15 min dry time after BPO before Retinol — reduces irritation significantly."},
  {icon:"✅",color:"#27AE60",text:"Remove Aztec mask while still slightly damp — cracking = barrier damage."},
  {icon:"✅",color:"#27AE60",text:"Apply HA on slightly damp skin — always. Damp skin = deeper penetration."},
];

// ─── HELPERS ────────────────────────────────────────────────────
const sum = (arr, k) => arr.reduce((a, i) => a + i[k], 0);
const calcDay = (m) => m.reduce((a, meal) => { a.p+=sum(meal.items,"p"); a.c+=sum(meal.items,"c"); a.f+=sum(meal.items,"f"); a.cal+=sum(meal.items,"cal"); return a; }, {p:0,c:0,f:0,cal:0});

const StepList = ({ steps, color }) => (
  <div>
    {steps.map((step, si) => (
      <div key={si} style={{ display:"flex", gap:12, marginBottom:12, paddingBottom:12, borderBottom:si<steps.length-1?"1px solid #0E0F10":"none" }}>
        <div style={{ width:26, height:26, borderRadius:"50%", background:color+"20", border:`1px solid ${color}35`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color, fontFamily:"monospace", fontWeight:700, flexShrink:0, marginTop:2 }}>{step.num}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:"#C8C6C0", marginBottom:3, fontWeight:600 }}>{step.product}</div>
          <div style={{ fontSize:11, color:"#404244", lineHeight:1.65, marginBottom:step.note?4:0 }}>{step.instruction}</div>
          {step.note && <div style={{ fontSize:10, color:step.note.includes("⚠")?"#C0392B":"#4A4C4E", padding:"4px 8px", background:step.note.includes("⚠")?"#1E0808":"#0A0B0D", borderLeft:`2px solid ${step.note.includes("⚠")?"#C0392B":color}40`, borderRadius:"0 4px 4px 0" }}>{step.note}</div>}
        </div>
      </div>
    ))}
  </div>
);

const SecBlock = ({ label, color, children }) => (
  <div style={{ marginBottom:14 }}>
    <div style={{ fontSize:8, color, fontFamily:"monospace", letterSpacing:"0.14em", marginBottom:8, paddingBottom:5, borderBottom:`1px solid ${color}20` }}>{label}</div>
    {children}
  </div>
);

export default function Protocol() {
  const [tab, setTab] = useState("schedule");
  const [day, setDay] = useState(T);
  const [openMeal, setOpenMeal] = useState(null);
  const [activeWD, setActiveWD] = useState(0);
  const [showDOD, setShowDOD] = useState(false);
  const [activeHD, setActiveHD] = useState(0);
  const [activeSD, setActiveSD] = useState(0);

  const current = meals[day];
  const totals = calcDay(current);
  const tTot = calcDay(meals[T]);
  const rTot = calcDay(meals[R]);
  const wDay = weekDays[activeWD];
  const hDay = hairDays[activeHD];
  const sDay = skinDays[activeSD];

  const ruleBox = (r, i) => (
    <div key={i} style={{ padding:"8px 12px", marginBottom:5, borderRadius:7, background:r.color==="#C0392B"?"#2A1010":r.color==="#C9A84C"?"#1E1A0A":"#0A1E12", border:`1px solid ${r.color}25`, fontSize:11, color:"#6A6C6E", lineHeight:1.6 }}>
      <span style={{ color:r.color, marginRight:6 }}>{r.icon}</span>{r.text}
    </div>
  );

  const washBadge = (washType) => {
    if (!washType) return null;
    const cfg = washType === "briogeo"
      ? { label:"BRIOGEO", sub:"Scalp Exfoliation", color:"#27AE60", bg:"#0A1E12" }
      : { label:"MIELLE", sub:"Moisture Reset", color:"#C9A84C", bg:"#1E1A0A" };
    return (
      <div style={{ display:"inline-flex", flexDirection:"column", padding:"5px 10px", background:cfg.bg, border:`1px solid ${cfg.color}30`, borderRadius:7, marginLeft:8 }}>
        <span style={{ fontSize:8, color:cfg.color, fontFamily:"monospace", letterSpacing:"0.14em", fontWeight:700 }}>{cfg.label}</span>
        <span style={{ fontSize:8, color:cfg.color+"99", fontFamily:"monospace" }}>{cfg.sub}</span>
      </div>
    );
  };

  return (
    <div style={{ minHeight:"100vh", background:"#07080A", color:"#EAE8E2", fontFamily:"'Palatino Linotype', Palatino, serif", overflowX:"hidden" }}>

      {/* ── HEADER ── */}
      <div style={{ background:"linear-gradient(170deg,#07080A 0%,#0C100D 50%,#09080C 100%)", borderBottom:"1px solid #161719", padding:"26px 20px 20px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse at 0% 100%,rgba(58,143,92,0.08) 0%,transparent 55%),radial-gradient(ellipse at 100% 0%,rgba(184,64,64,0.06) 0%,transparent 50%)" }} />
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:0.025, backgroundImage:"linear-gradient(#EAE8E2 1px,transparent 1px),linear-gradient(90deg,#EAE8E2 1px,transparent 1px)", backgroundSize:"44px 44px" }} />
        <div style={{ maxWidth:880, margin:"0 auto", position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
            <div style={{ display:"flex", gap:5 }}>{["#3A8F5C","#C8943A","#B84040","#4A72D4"].map(c=><div key={c} style={{ width:6, height:6, borderRadius:"50%", background:c, boxShadow:`0 0 7px ${c}` }} />)}</div>
            <span style={{ fontSize:9, letterSpacing:"0.26em", color:"#3A8F5C", fontFamily:"monospace" }}>TUNDE · 185 LBS · 4 AM FASTED PROTOCOL · DO OR DIE</span>
          </div>
          <div style={{ marginBottom:8 }}>
            <h1 style={{ fontSize:"clamp(22px,5vw,44px)", fontWeight:400, letterSpacing:"-0.03em", lineHeight:1.0, margin:"0 0 3px", fontStyle:"italic" }}>Ultimate</h1>
            <h1 style={{ fontSize:"clamp(22px,5vw,44px)", fontWeight:700, letterSpacing:"-0.03em", lineHeight:1.0, margin:0, color:"#3A8F5C" }}>Physique</h1>
          </div>
          <p style={{ color:"#343638", fontSize:11, margin:"0 0 14px", maxWidth:520, lineHeight:1.7 }}>Nutrition · Supplements · Training · Recovery · Hair · Skin — one unified daily OS.</p>
          <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:16 }}>
            <div style={{ display:"inline-flex", border:"1px solid #1A1C1E", borderRadius:6, overflow:"hidden" }}>
              {[{id:T,l:"🏋️  Training"},{id:R,l:"😴  Rest"}].map(d=>(
                <button key={d.id} onClick={()=>{setDay(d.id);setOpenMeal(null);}} style={{ padding:"7px 15px", background:day===d.id?"#3A8F5C":"transparent", border:"none", color:day===d.id?"#07080A":"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", letterSpacing:"0.07em", transition:"all 0.2s", fontWeight:day===d.id?700:400 }}>{d.l}</button>
              ))}
            </div>
            <button onClick={()=>setTab("hair")} style={{ padding:"7px 15px", background:tab==="hair"?"#C9A84C18":"#0E0F11", border:`1px solid ${tab==="hair"?"#C9A84C50":"#1A1C1E"}`, borderRadius:6, color:tab==="hair"?"#C9A84C":"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", letterSpacing:"0.07em", transition:"all 0.2s" }}>💈  Hair</button>
            <button onClick={()=>setTab("skin")} style={{ padding:"7px 15px", background:tab==="skin"?"#E8B4D018":"#0E0F11", border:`1px solid ${tab==="skin"?"#E8B4D050":"#1A1C1E"}`, borderRadius:6, color:tab==="skin"?"#E8B4D0":"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", letterSpacing:"0.07em", transition:"all 0.2s" }}>✨  Skin</button>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", borderTop:"1px solid #161719", paddingTop:14 }}>
            {[{label:"Window",val:"8 hrs",sub:"9AM–5PM",c:"#3A8F5C"},{label:"Calories",val:totals.cal.toLocaleString(),sub:"kcal",c:"#EAE8E2"},{label:"Protein",val:totals.p+"g",sub:Math.round(totals.p*4/totals.cal*100)+"%",c:"#B84040"},{label:"Carbs",val:totals.c+"g",sub:Math.round(totals.c*4/totals.cal*100)+"%",c:"#C8943A"},{label:"Fats",val:totals.f+"g",sub:Math.round(totals.f*9/totals.cal*100)+"%",c:"#4A72D4"}].map((s,i)=>(
              <div key={s.label} style={{ paddingRight:18, marginRight:18, borderRight:i<4?"1px solid #161719":"none", marginBottom:4 }}>
                <div style={{ fontSize:8, color:"#242628", letterSpacing:"0.2em", fontFamily:"monospace", textTransform:"uppercase", marginBottom:2 }}>{s.label}</div>
                <div style={{ fontSize:16, color:"#EAE8E2" }}>{s.val}</div>
                <div style={{ fontSize:9, color:s.c, fontFamily:"monospace" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div style={{ borderBottom:"1px solid #161719", background:"#090A0C", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ maxWidth:880, margin:"0 auto", display:"flex", overflowX:"auto" }}>
          {[["schedule","Schedule"],["workout","Workout"],["meals","Meals"],["supplements","Supps"],["macros","Macros"],["grocery","Grocery"],["swaps","Swaps"],["hair","💈 Hair"],["skin","✨ Skin"]].map(([id,lbl])=>{
            const ac = id==="hair"?"#C9A84C":id==="skin"?"#E8B4D0":"#3A8F5C";
            return <button key={id} onClick={()=>setTab(id)} style={{ padding:"11px 12px", background:"none", border:"none", color:tab===id?ac:"#282A2C", fontSize:10, cursor:"pointer", letterSpacing:"0.13em", fontFamily:"monospace", textTransform:"uppercase", borderBottom:tab===id?`2px solid ${ac}`:"2px solid transparent", transition:"all 0.2s", whiteSpace:"nowrap" }}>{lbl}</button>;
          })}
        </div>
      </div>

      <div style={{ maxWidth:880, margin:"0 auto", padding:"22px 18px 60px" }}>

        {/* ── SCHEDULE ── */}
        {tab==="schedule" && (
          <div>
            <div style={{ fontSize:9, color:"#3A8F5C", letterSpacing:"0.22em", fontFamily:"monospace", marginBottom:18 }}>24-HOUR DAILY BLUEPRINT</div>
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", left:17, top:8, bottom:8, width:1, background:"linear-gradient(to bottom,#6B4FBB40,#B8404040,#C8943A40,#3A8F5C40,#4A72D440,#16171940)" }} />
              {[
                {t:"4:00 AM",icon:"🙏",l:"Wake · Prayer · Pre-Training",c:"#6B4FBB",b:"B12 sublingual. Beet Root + Maca. Pre-Workout. Hair: Rogaine to scalp (skip Wed/Sun), Copenhagen Activator 10 min later."},
                {t:"4:30 AM",icon:"🏋️",l:"Do or Die Circuit",c:"#B84040",b:"100-rep sets across 27 movements + push-up ladder."},
                {t:"5:30 AM",icon:"💪",l:"Main Session",c:"#B84040",b:"Mon: Strength · Tue: Power · Wed: Conditioning · Thu: Hypertrophy · Fri: Posterior · Sat: Operator · Sun: Recovery."},
                {t:"8:00 AM",icon:"☕",l:"Coffee + L-Theanine · Skin AM Begins",c:"#C8943A",b:"CeraVe BPO wash → Vit C → HA → Alpha Arbutin → Cetaphil → SPF. L-Theanine + coffee. Prime deep work window."},
                {t:"9:00 AM",icon:"🍳",l:"Break Fast — Meal 1 + Morning Supps",c:"#3A8F5C",b:"Eggs + whey + oats + banana. Vitality here with Meal 1 fat. D3/K2 + DHT Blocker. Anabolic window open."},
                {t:"12:00 PM",icon:"🥬",l:"Meal 2 — Performance Lunch + Supergreens",c:"#3A8F5C",b:"Chicken + rice + kale + broccoli + avocado + sauerkraut. Mix Zena Greens stick in water alongside meal. Probiotics peak in fed state."},
                {t:"2:30 PM",icon:"🍓",l:"Meal 3 — Fruit + Protein Snack",c:"#B84040",b:"Greek yogurt + mango + kiwi + pomegranate + walnuts."},
                {t:"4:30 PM",icon:"🌿",l:"Meal 4 — Last Meal by 5 PM",c:"#6B4FBB",b:"Salmon + sweet potato + asparagus + bell pepper + turmeric."},
                {t:"5:00 PM",icon:"🔒",l:"16-Hour Fast Begins",c:"#1E2022",b:"Water, black coffee, electrolytes only until 9 AM."},
                {t:"7:00 PM",icon:"🪡",l:"Derma Roll (Wed & Sun only)",c:"#C9A84C",b:"Sanitize → Roll → The Ordinary immediately → Root Revive → Pumpkin Seed → Jojoba → Bonnet."},
                {t:"7:30 PM",icon:"🌙",l:"Skin PM + Hair Evening Stack",c:"#4A72D4",b:"Skin: Exfoliation (Mon/Wed/Fri), Retinol (Tue/Thu/Sat), Aztec Mask (Sun). Hair: The Ordinary → Root Revive → Pumpkin Seed → Jojoba → Bonnet."},
                {t:"9:30 PM",icon:"🌙",l:"Pre-Sleep Recovery Stack",c:"#4A72D4",b:"Growth Powder + Magnesium Bisglycinate."},
                {t:"10:00 PM",icon:"😴",l:"Sleep — Lights Out",c:"#4A72D4",b:"6 hours. Every rep, skin cycle, and follicle growth phase happens here."},
              ].map((item,i)=>(
                <div key={i} style={{ display:"flex", gap:12, marginBottom:4, position:"relative" }}>
                  <div style={{ width:34, height:34, borderRadius:"50%", flexShrink:0, background:item.c==="#1E2022"?"#101214":item.c+"14", border:`1px solid ${item.c==="#1E2022"?"#1A1C1E":item.c+"28"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, zIndex:1 }}>{item.icon}</div>
                  <div style={{ flex:1, padding:"9px 13px", marginBottom:4, background:"#0B0C0E", border:`1px solid ${item.c==="#1E2022"?"#131416":item.c+"14"}`, borderRadius:9 }}>
                    <div style={{ display:"flex", gap:10, alignItems:"baseline", marginBottom:3, flexWrap:"wrap" }}>
                      <span style={{ fontSize:11, color:item.c==="#1E2022"?"#282A2C":item.c, fontFamily:"monospace", fontWeight:700 }}>{item.t}</span>
                      <span style={{ fontSize:12, color:"#6A6C6E" }}>{item.l}</span>
                    </div>
                    <div style={{ fontSize:11, color:"#303234", lineHeight:1.7 }}>{item.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── WORKOUT ── */}
        {tab==="workout" && (
          <div>
            <div style={{ fontSize:9, color:"#3A8F5C", letterSpacing:"0.22em", fontFamily:"monospace", marginBottom:14 }}>DO OR DIE — 7-DAY TRAINING SPLIT</div>
            <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap" }}>
              {weekDays.map((d,i)=>(
                <button key={i} onClick={()=>setActiveWD(i)} style={{ padding:"8px 12px", borderRadius:8, border:`1px solid ${activeWD===i?d.color+"50":"#161719"}`, background:activeWD===i?d.color+"14":"#0B0C0E", color:activeWD===i?d.color:"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", transition:"all 0.2s" }}>
                  <div style={{ fontSize:8, opacity:0.7, marginBottom:1 }}>{d.day.toUpperCase()}</div>
                  <div style={{ fontSize:10 }}>{d.emoji} {d.tag}</div>
                </button>
              ))}
            </div>
            <div style={{ border:`1px solid ${wDay.color}30`, borderRadius:14, overflow:"hidden" }}>
              <div style={{ padding:"18px 20px", background:wDay.color+"10", borderBottom:`1px solid ${wDay.color}18` }}>
                <div style={{ fontSize:9, color:wDay.color, fontFamily:"monospace", letterSpacing:"0.2em", marginBottom:5 }}>{wDay.day.toUpperCase()} · {wDay.tag}</div>
                <div style={{ fontSize:19, color:"#EAE8E2", marginBottom:6 }}>{wDay.emoji} {wDay.type}</div>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{wDay.muscleGroups.map(g=><span key={g} style={{ padding:"2px 8px", borderRadius:20, background:wDay.color+"12", border:`1px solid ${wDay.color}20`, fontSize:9, color:wDay.color, fontFamily:"monospace" }}>{g}</span>)}</div>
              </div>
              <div style={{ padding:"18px 20px" }}>
                {wDay.doOrDie.length>0 && (
                  <div style={{ marginBottom:18 }}>
                    <button onClick={()=>setShowDOD(!showDOD)} style={{ width:"100%", padding:"11px 14px", background:"#0E0F11", border:"1px solid #1A1C1E", borderRadius:10, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:showDOD?8:0 }}>
                      <div style={{ textAlign:"left" }}>
                        <div style={{ fontSize:9, color:"#B84040", fontFamily:"monospace", letterSpacing:"0.16em", marginBottom:2 }}>DO OR DIE CIRCUIT — OPENS EVERY SESSION</div>
                        <div style={{ fontSize:11, color:"#5A5C5E" }}>27 movements · 100-rep sets + push-up ladder</div>
                      </div>
                      <span style={{ color:"#282A2C", fontSize:18 }}>{showDOD?"−":"+"}</span>
                    </button>
                    {showDOD && (
                      <div style={{ background:"#0B0C0E", border:"1px solid #B8404018", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))", gap:5 }}>
                          {wDay.doOrDie.map((ex,i)=>(
                            <div key={i} style={{ display:"flex", alignItems:"center", gap:7, padding:"5px 0", borderBottom:"1px solid #0E0F11" }}>
                              <div style={{ width:4, height:4, borderRadius:"50%", background:"#B84040", flexShrink:0 }} />
                              <span style={{ fontSize:11, color:"#484A4C" }}>{ex}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {wDay.circuitNote && <div style={{ padding:"10px 12px", background:wDay.color+"0A", border:`1px solid ${wDay.color}18`, borderRadius:9, marginBottom:14, fontSize:11, color:"#4A4C4E" }}><span style={{ color:wDay.color, fontFamily:"monospace", fontSize:8, letterSpacing:"0.12em" }}>CIRCUIT  </span>{wDay.circuitNote}</div>}
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:9, color:wDay.color, letterSpacing:"0.16em", fontFamily:"monospace", marginBottom:9 }}>MAIN SESSION</div>
                  <div style={{ overflowX:"auto" }}>
                    <table style={{ width:"100%", borderCollapse:"collapse", minWidth:480 }}>
                      <thead><tr style={{ borderBottom:"1px solid #141516" }}>{["Exercise","Sets","Reps","Rest","Focus"].map(h=><th key={h} style={{ padding:"6px 7px", textAlign:"left", fontSize:8, color:"#242628", fontFamily:"monospace", letterSpacing:"0.1em", fontWeight:400 }}>{h}</th>)}</tr></thead>
                      <tbody>{wDay.exercises.map((ex,i)=>(
                        <tr key={i} style={{ borderBottom:"1px solid #0D0E10" }}>
                          <td style={{ padding:"9px 7px", fontSize:11, color:"#9A9890" }}>{ex.name}</td>
                          <td style={{ padding:"9px 7px", fontSize:12, color:wDay.color, fontFamily:"monospace", textAlign:"center" }}>{ex.sets}</td>
                          <td style={{ padding:"9px 7px", fontSize:12, color:"#C8943A", fontFamily:"monospace" }}>{ex.reps}</td>
                          <td style={{ padding:"9px 7px", fontSize:11, color:"#404244", fontFamily:"monospace", whiteSpace:"nowrap" }}>{ex.rest}</td>
                          <td style={{ padding:"9px 7px", fontSize:10, color:"#343638" }}>{ex.focus}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
                  {[{c:"#3A8F5C",label:"NUTRITION NOTE",text:wDay.nutrition},{c:"#6B4FBB",label:"SUPPLEMENT NOTE",text:wDay.suppNote}].map(b=>(
                    <div key={b.label} style={{ padding:"11px 13px", background:"#0E0F11", border:`1px solid ${b.c}16`, borderRadius:9 }}>
                      <div style={{ fontSize:8, color:b.c, fontFamily:"monospace", letterSpacing:"0.14em", marginBottom:5 }}>{b.label}</div>
                      <div style={{ fontSize:11, color:"#404244", lineHeight:1.65 }}>{b.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MEALS ── */}
        {tab==="meals" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, marginBottom:18 }}>
              {[{id:T,l:"Training Day",d:tTot,c:"#3A8F5C"},{id:R,l:"Rest Day",d:rTot,c:"#6B4FBB"}].map(x=>(
                <div key={x.id} onClick={()=>{setDay(x.id);setOpenMeal(null);}} style={{ padding:"13px 15px", borderRadius:10, cursor:"pointer", background:day===x.id?x.c+"10":"#0B0C0E", border:`1px solid ${day===x.id?x.c+"35":"#161719"}`, transition:"all 0.2s" }}>
                  <div style={{ fontSize:9, color:day===x.id?x.c:"#282A2C", fontFamily:"monospace", letterSpacing:"0.14em", marginBottom:4 }}>{x.l.toUpperCase()}</div>
                  <div style={{ fontSize:21, color:"#EAE8E2", marginBottom:2 }}>{x.d.cal.toLocaleString()} <span style={{ fontSize:10, color:"#303234" }}>kcal</span></div>
                  <div style={{ fontSize:10, color:"#303234", fontFamily:"monospace" }}>{x.d.p}g P · {x.d.c}g C · {x.d.f}g F</div>
                </div>
              ))}
            </div>
            {current.map(meal=>{
              const mt={p:sum(meal.items,"p"),c:sum(meal.items,"c"),f:sum(meal.items,"f"),cal:sum(meal.items,"cal")};
              const isOpen=openMeal===meal.id;
              const isSupergreens = meal.id==="m2"||meal.id==="r2";
              return (
                <div key={meal.id} style={{ marginBottom:7, border:`1px solid ${isOpen?meal.color+"30":"#161719"}`, borderRadius:12, overflow:"hidden", background:isOpen?"#0C0D0F":"#0B0C0E" }}>
                  <div onClick={()=>setOpenMeal(isOpen?null:meal.id)} style={{ padding:"13px 17px", cursor:"pointer", display:"flex", alignItems:"center", gap:11 }}>
                    <div style={{ width:38, height:38, borderRadius:8, background:meal.color+"14", border:`1px solid ${meal.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{meal.emoji}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:1, flexWrap:"wrap" }}>
                        <span style={{ fontSize:8, color:meal.color, fontFamily:"monospace", letterSpacing:"0.16em" }}>{meal.label}</span>
                        <span style={{ fontSize:8, color:"#2C2E30", fontFamily:"monospace" }}>{meal.time}</span>
                        {isSupergreens && <span style={{ fontSize:8, color:"#27AE60", fontFamily:"monospace", padding:"1px 6px", background:"#0A1E12", border:"1px solid #27AE6030", borderRadius:4 }}>🥬 SUPERGREENS</span>}
                      </div>
                      <div style={{ fontSize:13, color:"#EAE8E2" }}>{meal.title}</div>
                    </div>
                    <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                      {[{l:"P",v:mt.p,c:"#B84040"},{l:"C",v:mt.c,c:"#C8943A"},{l:"F",v:mt.f,c:"#4A72D4"}].map(m=>(
                        <div key={m.l} style={{ textAlign:"center" }}>
                          <div style={{ fontSize:7, color:m.c, fontFamily:"monospace" }}>{m.l}</div>
                          <div style={{ fontSize:11, color:"#7A7870", fontFamily:"monospace" }}>{m.v}g</div>
                        </div>
                      ))}
                      <div style={{ textAlign:"center" }}>
                        <div style={{ fontSize:7, color:"#1E2022", fontFamily:"monospace" }}>CAL</div>
                        <div style={{ fontSize:11, color:"#EAE8E2", fontFamily:"monospace" }}>{mt.cal}</div>
                      </div>
                      <span style={{ color:"#202224", fontSize:16 }}>{isOpen?"−":"+"}</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop:`1px solid ${meal.color}12`, padding:"13px 17px" }}>
                      {isSupergreens && (
                        <div style={{ padding:"8px 12px", background:"#0A1E12", border:"1px solid #27AE6025", borderRadius:7, marginBottom:11, fontSize:11, color:"#27AE60" }}>
                          <span style={{ fontFamily:"monospace", fontSize:8, letterSpacing:"0.12em", display:"block", marginBottom:3 }}>🥬 ZENA GREENS — MIX IN WATER ALONGSIDE THIS MEAL</span>
                          <span style={{ color:"#404244", fontSize:11 }}>1 stick pack in 8–12oz water. Probiotics peak in the fed gut state. Antioxidants compound with sulforaphane from broccoli + kale. Zero sugar — no insulin impact.</span>
                        </div>
                      )}
                      <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:11 }}>
                        <thead><tr style={{ borderBottom:"1px solid #141516" }}>{["Ingredient","Amount","P","C","F","Cal"].map(h=><th key={h} style={{ padding:"4px", textAlign:h==="Ingredient"||h==="Amount"?"left":"right", fontSize:7, color:"#202224", fontFamily:"monospace", letterSpacing:"0.1em", fontWeight:400 }}>{h}</th>)}</tr></thead>
                        <tbody>{meal.items.map((item,i)=>(
                          <tr key={i} style={{ borderBottom:"1px solid #0C0D0F", background:item.name.includes("Zena")?"#0A1E12":"transparent" }}>
                            <td style={{ padding:"6px 4px", fontSize:11, color:item.name.includes("Zena")?"#27AE60":"#8A8880" }}>{item.name}</td>
                            <td style={{ padding:"6px 4px", fontSize:9, color:"#2C2E30", fontFamily:"monospace" }}>{item.amt}</td>
                            <td style={{ padding:"6px 4px", textAlign:"right", fontSize:9, color:"#B84040", fontFamily:"monospace" }}>{item.p}</td>
                            <td style={{ padding:"6px 4px", textAlign:"right", fontSize:9, color:"#C8943A", fontFamily:"monospace" }}>{item.c}</td>
                            <td style={{ padding:"6px 4px", textAlign:"right", fontSize:9, color:"#4A72D4", fontFamily:"monospace" }}>{item.f}</td>
                            <td style={{ padding:"6px 4px", textAlign:"right", fontSize:9, color:"#383A3C", fontFamily:"monospace" }}>{item.cal}</td>
                          </tr>
                        ))}</tbody>
                      </table>
                      <div style={{ background:meal.color+"07", border:`1px solid ${meal.color}12`, borderRadius:7, padding:"8px 11px", marginBottom:9, fontSize:11, color:"#404244", lineHeight:1.7 }}>
                        <span style={{ color:meal.color, fontFamily:"monospace", fontSize:7, letterSpacing:"0.12em" }}>NOTE  </span>{meal.note}
                      </div>
                      <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                        {meal.keys.map(k=><span key={k} style={{ padding:"2px 7px", borderRadius:20, background:"#0D0E10", border:"1px solid #161719", fontSize:8, color:"#2C2E30", fontFamily:"monospace" }}>{k}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── SUPPLEMENTS ── */}
        {tab==="supplements" && (
          <div>
            <div style={{ fontSize:9, color:"#3A8F5C", letterSpacing:"0.22em", fontFamily:"monospace", marginBottom:18 }}>COMPLETE SUPPLEMENT PROTOCOL</div>
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", left:17, top:8, bottom:8, width:1, background:"linear-gradient(to bottom,#6B4FBB40,#B8404040,#C8943A40,#3A8F5C40,#3A8F5C40,#4A72D440)" }} />
              {suppSchedule.map((block,i)=>(
                <div key={i} style={{ display:"flex", gap:13, marginBottom:4, position:"relative" }}>
                  <div style={{ width:34, height:34, borderRadius:"50%", flexShrink:0, background:block.color+"14", border:`1px solid ${block.color}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, zIndex:1 }}>{block.icon}</div>
                  <div style={{ flex:1, padding:"10px 13px", marginBottom:4, background:"#0B0C0E", border:`1px solid ${block.color}14`, borderRadius:9 }}>
                    <div style={{ display:"flex", gap:9, alignItems:"baseline", marginBottom:7, flexWrap:"wrap" }}>
                      <span style={{ fontSize:11, color:block.color, fontFamily:"monospace", fontWeight:700 }}>{block.time}</span>
                      <span style={{ fontSize:11, color:"#5A5C5E" }}>{block.label}</span>
                    </div>
                    {block.supps.map((s,j)=>(
                      <div key={j} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:6, paddingBottom:6, borderBottom:j<block.supps.length-1?"1px solid #0D0E10":"none" }}>
                        <div style={{ width:4, height:4, borderRadius:"50%", background:block.color, flexShrink:0, marginTop:4 }} />
                        <div>
                          <div style={{ fontSize:11, color:"#A8A6A0", marginBottom:1 }}>{s.name}</div>
                          <div style={{ fontSize:10, color:"#2C2E30" }}>{s.note}</div>
                        </div>
                      </div>
                    ))}
                    {block.warning && <div style={{ marginTop:5, padding:"6px 9px", background:"#C8943A0E", border:"1px solid #C8943A20", borderRadius:6, fontSize:10, color:"#6A5228" }}>{block.warning}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MACROS ── */}
        {tab==="macros" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, marginBottom:18 }}>
              {[{l:"Training Day",d:tTot,c:"#3A8F5C"},{l:"Rest Day",d:rTot,c:"#6B4FBB"}].map(({l,d,c})=>(
                <div key={l} style={{ padding:"15px", background:"#0B0C0E", border:`1px solid ${c}18`, borderRadius:12 }}>
                  <div style={{ fontSize:9, color:c, fontFamily:"monospace", letterSpacing:"0.14em", marginBottom:7 }}>{l.toUpperCase()}</div>
                  <div style={{ fontSize:24, color:"#EAE8E2", marginBottom:11 }}>{d.cal.toLocaleString()} <span style={{ fontSize:10, color:"#2C2E30" }}>kcal</span></div>
                  {[{n:"Protein",v:d.p,c:"#B84040",m:4},{n:"Carbs",v:d.c,c:"#C8943A",m:4},{n:"Fat",v:d.f,c:"#4A72D4",m:9}].map(mac=>(
                    <div key={mac.n} style={{ marginBottom:9 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                        <span style={{ fontSize:11, color:"#404244" }}>{mac.n}</span>
                        <span style={{ fontSize:10, color:mac.c, fontFamily:"monospace" }}>{mac.v}g · {Math.round(mac.v*mac.m/d.cal*100)}%</span>
                      </div>
                      <div style={{ height:3, background:"#141516", borderRadius:2 }}><div style={{ height:"100%", width:`${Math.round(mac.v*mac.m/d.cal*100)}%`, background:mac.c, borderRadius:2 }} /></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── GROCERY ── */}
        {tab==="grocery" && (
          <div>
            <div style={{ fontSize:9, color:"#3A8F5C", letterSpacing:"0.22em", fontFamily:"monospace", marginBottom:16 }}>WEEKLY GROCERY LIST</div>
            {grocery.map(cat=>(
              <div key={cat.cat} style={{ marginBottom:18 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7 }}>
                  <span style={{ fontSize:13 }}>{cat.emoji}</span>
                  <span style={{ fontSize:12, color:"#EAE8E2" }}>{cat.cat}</span>
                </div>
                <div style={{ paddingLeft:20 }}>
                  {cat.items.map(item=>(
                    <div key={item} style={{ padding:"6px 0", borderBottom:"1px solid #0D0E10", fontSize:11, color:item.includes("Zena")?"#27AE60":"#404244", display:"flex", alignItems:"center", gap:7 }}>
                      <div style={{ width:3, height:3, borderRadius:"50%", border:`1px solid ${item.includes("Zena")?"#27AE60":"#1A1C1E"}`, flexShrink:0 }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SWAPS ── */}
        {tab==="swaps" && (
          <div>
            <div style={{ fontSize:9, color:"#3A8F5C", letterSpacing:"0.22em", fontFamily:"monospace", marginBottom:16 }}>OPTIONAL SWAPS</div>
            {swaps.map((s,i)=>(
              <div key={i} style={{ padding:"11px 14px", marginBottom:6, background:"#0B0C0E", border:"1px solid #161719", borderRadius:9 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:3 }}>
                  <span style={{ fontSize:12, color:"#404244" }}>{s.from}</span>
                  <span style={{ color:"#1A1C1E" }}>→</span>
                  <span style={{ fontSize:12, color:"#9A9890" }}>{s.to}</span>
                </div>
                <div style={{ fontSize:9, color:"#242628", fontFamily:"monospace" }}>{s.why}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── HAIR ── */}
        {tab==="hair" && (
          <div>
            <div style={{ fontSize:9, color:"#C9A84C", letterSpacing:"0.22em", fontFamily:"monospace", marginBottom:5 }}>HAIR GROWTH & CARE PROTOCOL</div>
            <p style={{ fontSize:11, color:"#343638", marginBottom:10, lineHeight:1.7 }}>4c hair · Growth + Density + Scalp Health · Wash 2×/week · Derma Roll: Wed & Sun PM</p>
            {/* Wash day legend */}
            <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", background:"#0A1E12", border:"1px solid #27AE6030", borderRadius:7 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:"#27AE60" }} />
                <div>
                  <div style={{ fontSize:9, color:"#27AE60", fontFamily:"monospace", letterSpacing:"0.1em" }}>WEDNESDAY — BRIOGEO</div>
                  <div style={{ fontSize:9, color:"#2C3A2E" }}>Charcoal scalp exfoliation · No conditioner · Deep cleanse</div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", background:"#1E1A0A", border:"1px solid #C9A84C30", borderRadius:7 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:"#C9A84C" }} />
                <div>
                  <div style={{ fontSize:9, color:"#C9A84C", fontFamily:"monospace", letterSpacing:"0.1em" }}>SUNDAY — MIELLE</div>
                  <div style={{ fontSize:9, color:"#3A361A" }}>Sulfate-free shampoo + conditioner · Moisture reset · Type 4</div>
                </div>
              </div>
            </div>
            <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap" }}>
              {hairDays.map((d,i)=>(
                <button key={i} onClick={()=>setActiveHD(i)} style={{ padding:"7px 12px", borderRadius:8, border:`1px solid ${activeHD===i?d.color+"50":"#161719"}`, background:activeHD===i?d.color+"14":"#0B0C0E", color:activeHD===i?d.color:"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", transition:"all 0.2s" }}>
                  <div style={{ fontSize:8, opacity:0.7, marginBottom:1 }}>{d.day.toUpperCase()}</div>
                  <div style={{ fontSize:10 }}>{d.emoji} {d.tag}</div>
                </button>
              ))}
            </div>
            <div style={{ border:`1px solid ${hDay.color}30`, borderRadius:14, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", background:hDay.color+"10", borderBottom:`1px solid ${hDay.color}18` }}>
                <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:4, marginBottom:3 }}>
                  <div style={{ fontSize:9, color:hDay.color, fontFamily:"monospace", letterSpacing:"0.2em" }}>{hDay.day.toUpperCase()} · {hDay.tag}</div>
                  {washBadge(hDay.washType)}
                </div>
                <div style={{ fontSize:18, color:"#EAE8E2", marginBottom:5 }}>{hDay.emoji} {hDay.type}</div>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{hDay.focus.map(f=><span key={f} style={{ padding:"2px 8px", borderRadius:20, background:hDay.color+"12", border:`1px solid ${hDay.color}20`, fontSize:9, color:hDay.color, fontFamily:"monospace" }}>{f}</span>)}</div>
              </div>
              <div style={{ padding:"18px 20px" }}>
                <SecBlock label="🌅 4:00 AM — MORNING" color={hDay.color}><StepList steps={hDay.am} color={hDay.color} /></SecBlock>
                {hDay.washSteps && <>
                  <SecBlock label="🚿 PRE-WASH" color="#C8943A"><StepList steps={hDay.prewash} color="#C8943A" /></SecBlock>
                  {hDay.washType==="briogeo" && <SecBlock label="🧴 WASH — BRIOGEO SCALP EXFOLIATION (NO CONDITIONER)" color="#27AE60"><StepList steps={hDay.wash} color="#27AE60" /></SecBlock>}
                  {hDay.washType==="mielle" && <SecBlock label="🧴 WASH — MIELLE SHAMPOO + CONDITIONER" color="#C9A84C"><StepList steps={hDay.wash} color="#C9A84C" /></SecBlock>}
                  <SecBlock label="✨ LOC STYLING — ON DAMP HAIR" color="#B84040"><StepList steps={hDay.loc} color="#B84040" /></SecBlock>
                  <SecBlock label="🪡 7:00 PM — DERMA ROLL PROTOCOL" color="#6B4FBB"><StepList steps={hDay.pm} color="#6B4FBB" /></SecBlock>
                </>}
                {!hDay.washSteps && <SecBlock label="🌙 7:30 PM — NIGHTLY SCALP STACK" color={hDay.color}><StepList steps={hDay.pm} color={hDay.color} /></SecBlock>}
                <div style={{ padding:"9px 11px", background:"#0A0B0D", border:"1px solid #C0392B20", borderRadius:7, fontSize:10, color:"#7A3030" }}>
                  <span style={{ color:"#C0392B", fontFamily:"monospace", fontSize:8, letterSpacing:"0.12em" }}>⚠ KEY RULE  </span>
                  {hDay.roll ? "Rogaine SKIPPED this morning — derma roll tonight. Resume Rogaine next morning." : "Rogaine at 4 AM. Never apply oils to scalp before Rogaine fully dries."}
                </div>
              </div>
            </div>
            <div style={{ marginTop:14 }}>
              <div style={{ fontSize:9, color:"#C9A84C", letterSpacing:"0.18em", fontFamily:"monospace", marginBottom:7 }}>GOLDEN RULES</div>
              {hairRules.map(ruleBox)}
            </div>
          </div>
        )}

        {/* ── SKIN ── */}
        {tab==="skin" && (
          <div>
            <div style={{ fontSize:9, color:"#E8B4D0", letterSpacing:"0.22em", fontFamily:"monospace", marginBottom:5 }}>SKINCARE PROTOCOL</div>
            <p style={{ fontSize:11, color:"#343638", marginBottom:12, lineHeight:1.7 }}>Combination · Acne + Hyperpigmentation + Texture + Glass Skin</p>
            <div style={{ padding:"9px 13px", background:"#1E0808", border:"1px solid #C0392B30", borderRadius:8, marginBottom:14, fontSize:11, color:"#7A3030", lineHeight:1.7 }}>
              <div style={{ fontSize:8, color:"#C0392B", fontFamily:"monospace", letterSpacing:"0.14em", marginBottom:3 }}>⚠ CRITICAL CONFLICTS</div>
              Vit C + Niacinamide same session · Retinol + Glycolic same night · BPO → dry time before Retinol · Aztec mask = no other actives PM · Tea Tree neat on skin
            </div>
            <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap" }}>
              {skinDays.map((d,i)=>(
                <button key={i} onClick={()=>setActiveSD(i)} style={{ padding:"7px 12px", borderRadius:8, border:`1px solid ${activeSD===i?d.color+"50":"#161719"}`, background:activeSD===i?d.color+"14":"#0B0C0E", color:activeSD===i?d.color:"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", transition:"all 0.2s" }}>
                  <div style={{ fontSize:8, opacity:0.7, marginBottom:1 }}>{d.day.toUpperCase()}</div>
                  <div style={{ fontSize:10 }}>{d.emoji} {d.tag}</div>
                </button>
              ))}
            </div>
            <div style={{ border:`1px solid ${sDay.color}30`, borderRadius:14, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", background:sDay.color+"10", borderBottom:`1px solid ${sDay.color}18` }}>
                <div style={{ fontSize:9, color:sDay.color, fontFamily:"monospace", letterSpacing:"0.2em", marginBottom:3 }}>{sDay.day.toUpperCase()} · {sDay.tag}</div>
                <div style={{ fontSize:18, color:"#EAE8E2", marginBottom:5 }}>{sDay.emoji} {sDay.type}</div>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{sDay.focus.map(f=><span key={f} style={{ padding:"2px 8px", borderRadius:20, background:sDay.color+"12", border:`1px solid ${sDay.color}20`, fontSize:9, color:sDay.color, fontFamily:"monospace" }}>{f}</span>)}</div>
              </div>
              <div style={{ padding:"18px 20px" }}>
                <SecBlock label="🌅 4:00 AM — MORNING ROUTINE" color={sDay.color}><StepList steps={sDay.am} color={sDay.color} /></SecBlock>
                <SecBlock label={sDay.day==="Sun"?"🌙 7:30 PM — AZTEC MASK + BARRIER REBUILD":sDay.tag==="RETINOL"?"🌙 7:30 PM — RETINOL SANDWICH":"🌙 7:30 PM — EXFOLIATION"} color={sDay.color}>
                  <StepList steps={sDay.pm} color={sDay.color} />
                </SecBlock>
                <div style={{ padding:"9px 11px", background:"#0A0B0D", border:`1px solid ${sDay.color}18`, borderRadius:7, fontSize:10, color:"#4A4C4E" }}>
                  <span style={{ color:sDay.color, fontFamily:"monospace", fontSize:8, letterSpacing:"0.12em" }}>SPOT TREATMENTS  </span>
                  Tea Tree: 1 drop + Cetaphil, dab on pimple only · Salicylic 2%: nose/breakout zones, any night as targeted spot
                </div>
              </div>
            </div>
            <div style={{ marginTop:14 }}>
              <div style={{ fontSize:9, color:"#E8B4D0", letterSpacing:"0.18em", fontFamily:"monospace", marginBottom:7 }}>GOLDEN RULES</div>
              {skinRules.map(ruleBox)}
            </div>
          </div>
        )}

      </div>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 3px; height: 3px; } ::-webkit-scrollbar-track { background: #07080A; } ::-webkit-scrollbar-thumb { background: #1A1C1E; border-radius: 2px; } button:focus { outline: none; }`}</style>
    </div>
  );
}
