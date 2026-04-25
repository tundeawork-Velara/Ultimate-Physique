import { useState } from "react";

const T = "training";
const R = "rest";

const DOD = ["100 Reverse Plank","100 Rear Delt Flys","100 Reverse Nordics","100 Side Plank Reach","100 Pistol Squats","100 Nordic Ham Curls","100 Neck Curls/Ext","100 Reverse Curls","100 Ab Wheel","100 Curls (var)","100 Hip Bridges","100 Leg Raises","100 Tricep Ext","100 Flys","Standard PU × 30","100 Pike PU","Close-Grip PU × 25","Decline PU × 25","Explosive PU × 20","Diamond PU × 20","Incline PU × 20","Wide PU × 20","Incline sm × 20","Archer PU × 20","Tempo PU × 20","Pseudo Planche × 20","Close-Grip PU × 20"];

const weekDays = [
  { day:"Monday",type:"Upper Body Max Strength",emoji:"💪",color:"#B84040",tag:"STRENGTH",
    doOrDie:DOD,
    exercises:[{name:"Weighted Pull-Ups (or Backpack Pull-Ups)",sets:5,reps:"10",rest:"3 min",focus:"Back width + bicep"},{name:"Weighted Dips (or Chair Dips + Weight)",sets:5,reps:"10",rest:"2–3 min",focus:"Chest + tricep"},{name:"Overhead Press (DBs / Barbell)",sets:5,reps:"10",rest:"2–3 min",focus:"Shoulders"},{name:"One-Arm DB Row",sets:5,reps:"10/arm",rest:"2 min",focus:"Mid-back"},{name:"Hanging Knee / Leg Raises",sets:5,reps:"25",rest:"1 min",focus:"Core + hips"},{name:"Farmer Carries (Heavy DBs / Bags)",sets:5,reps:"40 sec",rest:"1 min",focus:"Grip + traps + core"},{name:"Bench Press (heavy)",sets:5,reps:"10",rest:"2 min",focus:"Chest max strength"},{name:"Close-Grip Bench (heavy)",sets:5,reps:"10",rest:"2 min",focus:"Tricep strength + inner chest"}],
    nutrition:"Highest carb day. Banana + full rice + sweet potato.",
    suppNote:"Full pre-workout + creatine. Post-workout whey within 30 min.",
    muscleGroups:["Chest","Back","Shoulders","Triceps","Biceps","Core"] },
  { day:"Tuesday",type:"Lower Body Strength & Power",emoji:"🦵",color:"#C8943A",tag:"POWER",
    doOrDie:DOD,
    exercises:[{name:"Back Squat (DB Goblet if no rack)",sets:5,reps:"10",rest:"3 min",focus:"Quad + glute"},{name:"Romanian Deadlift (DBs or Barbell)",sets:5,reps:"10",rest:"2–3 min",focus:"Posterior chain"},{name:"Bulgarian Split Squat",sets:5,reps:"10/leg",rest:"2 min",focus:"Unilateral balance"},{name:"Hip Thrusts (Weighted)",sets:5,reps:"10",rest:"2 min",focus:"Glute strength"},{name:"Box Jumps / Step-Ups",sets:5,reps:"10",rest:"1–2 min",focus:"Explosive power"},{name:"Bench Press (volume)",sets:5,reps:"15",rest:"3 min",focus:"Chest volume"},{name:"Incline Bench (volume)",sets:5,reps:"15",rest:"3 min",focus:"Upper chest"}],
    nutrition:"High carb. Full sweet potato + banana.",
    suppNote:"Full electrolyte mix. Creatine demand highest on leg days.",
    muscleGroups:["Quads","Hamstrings","Glutes","Calves","Core","Chest (volume)"] },
  { day:"Wednesday",type:"Tactical Conditioning",emoji:"🔥",color:"#3A8F5C",tag:"CONDITIONING",
    doOrDie:[],
    exercises:[{name:"Burpees",sets:5,reps:"20",rest:"In circuit",focus:"Full body metabolic conditioning"},{name:"Push-Ups (Wide / Close mix)",sets:5,reps:"25",rest:"In circuit",focus:"Chest + tricep endurance"},{name:"Pull-Ups (Assisted if needed)",sets:5,reps:"15",rest:"In circuit",focus:"Back + bicep endurance"},{name:"Walking Lunges (Weighted optional)",sets:5,reps:"30",rest:"In circuit",focus:"Quad + glute"},{name:"200m Sprint / High-Knee Run",sets:5,reps:"1",rest:"2 min between rounds",focus:"Cardiovascular + lactate threshold"}],
    circuitNote:"5 Rounds · Operator Circuit. 2 min rest between rounds only.",
    nutrition:"Moderate carb. Hydration focus.",
    suppNote:"Standard stack. Beet root for cardio output.",
    muscleGroups:["Full Body","Cardiovascular","Metabolic"] },
  { day:"Thursday",type:"Upper Body Hypertrophy",emoji:"📈",color:"#4A72D4",tag:"HYPERTROPHY",
    doOrDie:DOD,
    exercises:[{name:"Incline DB Bench Press",sets:5,reps:"10",rest:"90 sec",focus:"Upper chest hypertrophy"},{name:"Pull-Ups / Chin-Ups",sets:5,reps:"15 / AMRAP",rest:"2 min",focus:"Back + bicep vol"},{name:"Ring / Chair Dips",sets:5,reps:"10",rest:"2 min",focus:"Chest + tricep hyp"},{name:"Face Pulls / Band Pull-Aparts",sets:5,reps:"15",rest:"1 min",focus:"Rear delt health"},{name:"Hammer Curls",sets:5,reps:"15",rest:"1 min",focus:"Brachialis"},{name:"Lateral Raises",sets:5,reps:"15",rest:"1 min",focus:"Medial delt"},{name:"Speed Bench (explosive)",sets:8,reps:"5",rest:"1 min",focus:"Rate of force"},{name:"Spoto Press (3 sec hold)",sets:5,reps:"5",rest:"1 min",focus:"Bottom position strength"}],
    nutrition:"High carb — glycogen for volume work.",
    suppNote:"Creatine valuable for speed bench sets.",
    muscleGroups:["Upper Chest","Back","Rear Delts","Biceps","Lateral Delts","Triceps"] },
  { day:"Friday",type:"Lower Body Power & Posterior Chain",emoji:"⚡",color:"#6B4FBB",tag:"POSTERIOR",
    doOrDie:DOD,
    exercises:[{name:"Front Squat (DB Goblet or Barbell)",sets:5,reps:"10",rest:"3 min",focus:"Quad dominance + core stability"},{name:"Romanian Deadlift",sets:5,reps:"10",rest:"2–3 min",focus:"Hamstring + glute stretch strength"},{name:"Hip Thrusts",sets:5,reps:"10",rest:"2 min",focus:"Glute activation + posterior power"},{name:"Broad Jumps / Step Jumps",sets:5,reps:"10",rest:"1–2 min",focus:"Horizontal power"},{name:"Farmer Carries",sets:5,reps:"40 sec",rest:"1 min",focus:"Grip + traps"},{name:"Paused Bench (5 sec hold)",sets:5,reps:"5",rest:"1 min",focus:"Eccentric control"},{name:"Press (no shoulder extension)",sets:5,reps:"5",rest:"1 min",focus:"Shoulder joint health"}],
    nutrition:"High carb — last high-carb day of the week.",
    suppNote:"Magnesium at 8:30 PM — supports weekend recovery.",
    muscleGroups:["Quads","Hamstrings","Glutes","Posterior Chain","Grip","Shoulders"] },
  { day:"Saturday",type:"Full-Body Operator Circuit",emoji:"🎖️",color:"#B84040",tag:"OPERATOR",
    doOrDie:[],
    exercises:[{name:"400m Run / Stair Run",sets:5,reps:"1",rest:"In circuit",focus:"Aerobic + legs"},{name:"Burpees",sets:5,reps:"20",rest:"In circuit",focus:"Full body explosive"},{name:"Pull-Ups",sets:5,reps:"15",rest:"In circuit",focus:"Back + bicep endurance"},{name:"Goblet Squats",sets:5,reps:"20",rest:"In circuit",focus:"Quad + glute"},{name:"Kettlebell / DB Swings",sets:5,reps:"20",rest:"In circuit",focus:"Hip hinge power"},{name:"40m Weighted Carry",sets:5,reps:"1",rest:"2 min between rounds",focus:"Loaded carry"}],
    circuitNote:"5 Rounds · Full-Body Operator Circuit. 2 min rest between rounds.",
    nutrition:"Highest aerobic demand — full carb portions.",
    suppNote:"Beet root + maca potent for the 400m run sets.",
    muscleGroups:["Full Body","Cardiovascular","Grip","Core","Posterior Chain"] },
  { day:"Sunday",type:"Full-Body Mobility Protocol",emoji:"🧘",color:"#3A8F5C",tag:"RECOVERY",
    doOrDie:[],
    mobilityPhases:[
      { phase:"PHASE 1", label:"Spine + Thoracic", duration:"6 min", color:"#3A8F5C", emoji:"🌀",
        movements:[
          {name:"Cat-Cow",sets:"2",reps:"10 slow cycles",rest:"—",focus:"Segmental spinal mobilization",instruction:"All fours. Exhale: arch back, tuck chin. Inhale: drop belly, lift chest.",note:null},
          {name:"Thoracic Rotation (Seated)",sets:"2",reps:"8 each side",rest:"—",focus:"Upper back rotation",instruction:"Sit cross-legged, hands behind head. Rotate upper body only, hips still.",note:null},
          {name:"Thread the Needle",sets:"2",reps:"6 each side, 3 sec hold",rest:"—",focus:"Thoracic + shoulder rotation",instruction:"All fours. Thread one arm under body. Shoulder drops to floor. Hold.",note:"Push floor with top hand for deeper rotation."},
          {name:"Spinal Wave (Standing)",sets:"2",reps:"8",rest:"—",focus:"Full spinal articulation",instruction:"Standing. Tuck chin, roll down vertebra by vertebra to floor. Roll back up.",note:"Soft knee bend if hamstrings are tight."},
        ]},
      { phase:"PHASE 2", label:"Hips + Hip Flexors", duration:"6 min", color:"#C8943A", emoji:"🦵",
        movements:[
          {name:"90/90 Hip Switch",sets:"2",reps:"6 switches each direction",rest:"—",focus:"Hip internal + external rotation",instruction:"Both legs 90°. Rotate sides by lifting both legs. Tall spine.",note:"Best hip mobility movement — hits internal + external rotation."},
          {name:"Deep Squat Hold",sets:"3",reps:"45 sec hold",rest:"15 sec",focus:"Hip flexor + groin + ankle mobility",instruction:"Full squat, elbows push knees out, chest tall.",note:"Elevate heels if ankles too tight."},
          {name:"Couch Stretch",sets:"2",reps:"60 sec each side",rest:"15 sec",focus:"Hip flexor + quad lengthening",instruction:"Back knee on floor, back foot on wall. Squeeze glute. Tall torso.",note:"Best hip flexor stretch. Critical after training."},
          {name:"Hip CARs (Controlled Articular Rotations)",sets:"1",reps:"5 full circles each side",rest:"—",focus:"Full hip joint lubrication",instruction:"Hold wall. Knee to 90°. Trace largest possible circle. Zero momentum.",note:"CARs lubricate the joint. 5–8 sec per circle."},
        ]},
      { phase:"PHASE 3", label:"Hamstrings + Posterior Chain", duration:"6 min", color:"#6B4FBB", emoji:"🔗",
        movements:[
          {name:"PNF Hamstring Stretch",sets:"2",reps:"3 rounds each side",rest:"—",focus:"Hamstring length + neural release",instruction:"On back. Lift leg, pull to chest. Contract hamstring 5 sec, relax, pull deeper. 3×.",note:"PNF is 2× more effective than static. Contract-relax-deepen."},
          {name:"World's Greatest Stretch",sets:"2",reps:"5 each side",rest:"—",focus:"Hip flexor + thoracic + hamstring integration",instruction:"Lunge. Same-side hand floor. Rotate top arm to ceiling. Straighten back leg, fold forward.",note:"Best full-body mobility movement."},
          {name:"Seated Forward Fold",sets:"2",reps:"60 sec hold",rest:"—",focus:"Hamstring + lower back",instruction:"Legs extended, reach toward feet. Flex feet. Let gravity work.",note:"Each exhale, sink 1% deeper."},
          {name:"Glute Figure-4 Stretch",sets:"2",reps:"45 sec each side",rest:"—",focus:"Piriformis + deep glute",instruction:"On back. Ankle over opposite knee. Pull both legs to chest.",note:"Releases piriformis — prevents sciatic compression."},
        ]},
      { phase:"PHASE 4", label:"Shoulders + Chest", duration:"6 min", color:"#B84040", emoji:"🏹",
        movements:[
          {name:"Shoulder CARs",sets:"1",reps:"5 full circles each arm",rest:"—",focus:"Full shoulder joint lubrication",instruction:"Scapula locked, arm only. Trace largest circle. Zero compensation.",note:"Best shoulder prehab. Do before pressing."},
          {name:"Doorframe / Wall Chest Opener",sets:"2",reps:"45 sec each side",rest:"—",focus:"Pectoral + anterior shoulder stretch",instruction:"Arm at 90° in doorframe. Rotate body away. Hold.",note:"Critical after bench days. Opens anterior capsule."},
          {name:"Sleeper Stretch",sets:"2",reps:"45 sec each side",rest:"—",focus:"Posterior shoulder capsule",instruction:"Lie on side. Elbow 90°. Top hand presses wrist to floor.",note:"Tightest part of shoulder in most lifters."},
          {name:"Cross-Body Shoulder Stretch + Circles",sets:"2",reps:"30 sec stretch + 10 circles each arm",rest:"—",focus:"Deltoid + rotator cuff",instruction:"Pull arm across chest 30 sec. Then large arm circles forward + back.",note:null},
        ]},
      { phase:"PHASE 5", label:"Ankles + Full Integration", duration:"6 min", color:"#4A72D4", emoji:"🌊",
        movements:[
          {name:"Ankle CARs",sets:"1",reps:"8 full circles each ankle",rest:"—",focus:"Full ankle joint lubrication",instruction:"Lift foot. Trace largest possible circle. Slow and controlled.",note:"Ankle mobility affects squat depth + knee health."},
          {name:"Kneeling Ankle Dorsiflexion",sets:"2",reps:"10 each side",rest:"—",focus:"Ankle dorsiflexion range",instruction:"Half-kneeling. Drive knee forward over pinky toe, heel down. 3 sec hold.",note:"Every cm gained improves squat depth."},
          {name:"Deep Squat Heel Raise to Hold",sets:"2",reps:"10 raises + 30 sec hold",rest:"—",focus:"Ankle + hip integration",instruction:"Full squat. Rise to tiptoes 10×. Hold squat 30 sec.",note:"Integrates ankle + hip + spine."},
          {name:"Full-Body Integration Flow",sets:"1",reps:"3 min continuous",rest:"—",focus:"Full system reset",instruction:"Move freely through tight areas. No structure. Follow what your body wants.",note:"Nervous system integrates everything here."},
        ]},
    ],
    exercises:[
      {name:"Phase 1 — Spine + Thoracic",sets:"—",reps:"6 min",rest:"—",focus:"Cat-cow · Thoracic rotation · Thread the needle · Spinal wave"},
      {name:"Phase 2 — Hips + Hip Flexors",sets:"—",reps:"6 min",rest:"—",focus:"90/90 switch · Deep squat hold · Couch stretch · Hip CARs"},
      {name:"Phase 3 — Hamstrings + Posterior Chain",sets:"—",reps:"6 min",rest:"—",focus:"PNF hamstring · World's greatest stretch · Forward fold · Figure-4"},
      {name:"Phase 4 — Shoulders + Chest",sets:"—",reps:"6 min",rest:"—",focus:"Shoulder CARs · Chest opener · Sleeper stretch · Cross-body"},
      {name:"Phase 5 — Ankles + Integration",sets:"—",reps:"6 min",rest:"—",focus:"Ankle CARs · Dorsiflexion · Deep squat flow · Free movement"},
      {name:"Full-Body Stretching / Yoga Flow",sets:1,reps:"60 min",rest:"—",focus:"Fascia release"},
      {name:"Band Shoulder & Rotator Cuff Work",sets:3,reps:"15–20/direction",rest:"30 sec",focus:"Rotator cuff"},
      {name:"Plank Variations",sets:4,reps:"60 sec each",rest:"30 sec",focus:"Core stability"},
      {name:"Optional Light Swim or Walk",sets:1,reps:"20–30 min",rest:"—",focus:"Active recovery"},
    ],
    nutrition:"Rest day macros. Lowest carbs.",
    suppNote:"Skip Pre-Workout. Casein + Magnesium at 8:30 PM.",
    muscleGroups:["Spine","Hips","Hamstrings","Shoulders","Ankles","Full Body"] },
];

const S = "sunday";

const meals = {
  [T]: [
    { id:"m1",time:"9:00 AM",label:"MEAL 1",title:"Post-Workout Recovery Breakfast",sub:"Break the fast · Anabolic window · Largest meal",emoji:"🍳",color:"#C8943A",
      items:[{name:"Whole eggs",amt:"3 large (150g)",p:18,c:1,f:15,cal:210},{name:"Egg whites",amt:"5 whites (150g)",p:18,c:1,f:0,cal:75},{name:"Grass-Fed Whey Isolate",amt:"1 scoop (~30g)",p:25,c:3,f:2,cal:130},{name:"Rolled oats (dry)",amt:"80g",p:10,c:54,f:5,cal:300},{name:"Banana",amt:"1 medium (120g)",p:1,c:27,f:0,cal:105},{name:"Blueberries",amt:"80g",p:1,c:11,f:0,cal:46},{name:"Ground flaxseed",amt:"15g",p:2,c:3,f:6,cal:74},{name:"Baby spinach (raw)",amt:"40g",p:1,c:1,f:0,cal:9},{name:"Extra virgin olive oil",amt:"1 tsp (5g)",p:0,c:0,f:5,cal:40}],
      note:"Break fast within 30 min. Whey + eggs = rapid leucine spike. Banana replenishes glycogen. D3/K2 with food fat.",
      keys:["Glycogen replenishment (banana + oats)","Anti-inflammatory (blueberries)","Omega-3 (flax)","Complete protein (eggs + whey)"] },
    { id:"m2",time:"12:00 PM",label:"MEAL 2",title:"Performance Lunch + Supergreens",sub:"Peak insulin sensitivity · Protein + veggie anchor · Supergreens with water",emoji:"⚡",color:"#3A8F5C",
      items:[{name:"Chicken breast (cooked)",amt:"220g",p:68,c:0,f:4,cal:307},{name:"White rice (cooked)",amt:"180g",p:3,c:40,f:0,cal:180},{name:"Broccoli (steamed)",amt:"120g",p:3,c:7,f:0,cal:41},{name:"Kale (wilted)",amt:"80g",p:3,c:6,f:1,cal:43},{name:"Purple cabbage (raw)",amt:"60g",p:1,c:4,f:0,cal:20},{name:"Avocado",amt:"½ medium (75g)",p:1,c:4,f:11,cal:112},{name:"Sauerkraut (raw)",amt:"60g",p:1,c:2,f:0,cal:11},{name:"Zena Greens Supergreens (1 stick)",amt:"~11g stick pack",p:1,c:3,f:0,cal:15},{name:"Lemon + garlic + pepper",amt:"to taste",p:0,c:1,f:0,cal:5}],
      note:"Supergreens in water alongside meal. Probiotics + sulforaphane stack. Sauerkraut always cold.",
      keys:["Probiotics (supergreens + sauerkraut)","Sulforaphane + antioxidant stack (broccoli + greens)","70+ superfoods (Zena Greens)","Healthy fat (avocado)"] },
    { id:"m3",time:"2:30 PM",label:"MEAL 3",title:"Fruit + Protein Snack",sub:"Micronutrient hit · Sustained energy mid-window",emoji:"🍓",color:"#B84040",
      items:[{name:"Greek yogurt (plain, full-fat)",amt:"200g",p:20,c:8,f:10,cal:200},{name:"Mango (diced)",amt:"100g",p:1,c:25,f:0,cal:99},{name:"Kiwi (sliced)",amt:"2 medium (148g)",p:2,c:18,f:1,cal:90},{name:"Pomegranate seeds",amt:"50g",p:1,c:9,f:0,cal:41},{name:"Walnuts (raw)",amt:"20g",p:5,c:4,f:13,cal:131},{name:"Ground cinnamon",amt:"¼ tsp",p:0,c:0,f:0,cal:2}],
      note:"Kiwi reduces DOMS. Pomegranate reduces muscle damage.",
      keys:["DOMS reduction (kiwi)","Muscle recovery (pomegranate)","Beta-carotene (mango)","ALA omega-3 (walnuts)"] },
    { id:"m4",time:"4:30 PM",label:"MEAL 4",title:"Last Meal — Overnight Fuel",sub:"Eaten by 5:00 PM · Fuels tomorrow's 4 AM session",emoji:"🌿",color:"#6B4FBB",
      items:[{name:"Salmon fillet (cooked)",amt:"200g",p:40,c:0,f:20,cal:350},{name:"Sweet potato (baked)",amt:"180g",p:3,c:36,f:0,cal:154},{name:"Asparagus (roasted)",amt:"120g",p:3,c:5,f:0,cal:27},{name:"Spinach (wilted)",amt:"100g",p:3,c:3,f:0,cal:23},{name:"Bell peppers, mixed (roasted)",amt:"100g",p:1,c:6,f:0,cal:31},{name:"Extra virgin olive oil",amt:"1 tbsp (14g)",p:0,c:0,f:14,cal:119},{name:"Lemon + garlic + turmeric + black pepper",amt:"to taste",p:0,c:1,f:0,cal:5}],
      note:"Sweet potato = overnight glycogen. Salmon EPA/DHA reduces sleep inflammation.",
      keys:["EPA/DHA omega-3 (salmon)","Overnight glycogen (sweet potato)","Vitamin C (bell pepper)","Anti-inflammatory (turmeric)"] },
  ],
  [R]: [
    { id:"r1",time:"9:00 AM",label:"MEAL 1",title:"Morning Rebuild Breakfast",sub:"Lower carbs · Same protein · Cellular repair day",emoji:"🍳",color:"#C8943A",
      items:[{name:"Whole eggs",amt:"3 large (150g)",p:18,c:1,f:15,cal:210},{name:"Egg whites",amt:"5 whites (150g)",p:18,c:1,f:0,cal:75},{name:"Grass-Fed Whey Isolate",amt:"1 scoop (~30g)",p:25,c:3,f:2,cal:130},{name:"Rolled oats (dry)",amt:"50g",p:6,c:34,f:3,cal:187},{name:"Blueberries",amt:"80g",p:1,c:11,f:0,cal:46},{name:"Strawberries (sliced)",amt:"100g",p:1,c:8,f:0,cal:32},{name:"Ground flaxseed",amt:"15g",p:2,c:3,f:6,cal:74},{name:"Baby spinach (raw)",amt:"40g",p:1,c:1,f:0,cal:9},{name:"Extra virgin olive oil",amt:"1 tsp (5g)",p:0,c:0,f:5,cal:40}],
      note:"Rest day: oats reduced. Fisetin in strawberries amplifies autophagy.",
      keys:["Fisetin + autophagy (strawberries)","Antioxidants (blueberries)","Omega-3 (flax)","Complete protein"] },
    { id:"r2",time:"12:00 PM",label:"MEAL 2",title:"Recovery Lean Plate + Supergreens",sub:"High protein · Reduced carbs · Gut health + superfoods",emoji:"🥗",color:"#3A8F5C",
      items:[{name:"Chicken breast (cooked)",amt:"230g",p:71,c:0,f:4,cal:321},{name:"Brown rice (cooked)",amt:"120g",p:2,c:26,f:1,cal:120},{name:"Broccoli (steamed)",amt:"150g",p:4,c:9,f:0,cal:51},{name:"Kale (wilted)",amt:"80g",p:3,c:6,f:1,cal:43},{name:"Cherry tomatoes",amt:"100g",p:1,c:4,f:0,cal:18},{name:"Cucumber (sliced)",amt:"100g",p:1,c:4,f:0,cal:15},{name:"Avocado",amt:"½ medium (75g)",p:1,c:4,f:11,cal:112},{name:"Sauerkraut (raw)",amt:"60g",p:1,c:2,f:0,cal:11},{name:"Zena Greens Supergreens (1 stick)",amt:"~11g stick pack",p:1,c:3,f:0,cal:15}],
      note:"Supergreens in water. Rest day probiotics peak. Lycopene protects testosterone.",
      keys:["Lycopene (tomatoes)","Probiotics (supergreens + sauerkraut)","Sulforaphane (broccoli + kale)","70+ superfoods"] },
    { id:"r3",time:"2:30 PM",label:"MEAL 3",title:"Low-Carb Fruit + Fat Snack",sub:"Fat-dominant · Zinc-rich · No training carb load",emoji:"🍇",color:"#B84040",
      items:[{name:"Greek yogurt (plain, full-fat)",amt:"200g",p:20,c:8,f:10,cal:200},{name:"Mixed berries",amt:"150g",p:2,c:18,f:1,cal:85},{name:"Walnuts (raw)",amt:"25g",p:6,c:4,f:16,cal:164},{name:"Pumpkin seeds (raw)",amt:"20g",p:5,c:3,f:6,cal:88},{name:"Ground cinnamon",amt:"¼ tsp",p:0,c:0,f:0,cal:2}],
      note:"Pumpkin seeds: richest plant zinc — testosterone + recovery.",
      keys:["Zinc (pumpkin seeds)","Ellagic acid (raspberries)","ALA omega-3 (walnuts)","Insulin regulation (cinnamon)"] },
    { id:"r4",time:"4:30 PM",label:"MEAL 4",title:"Last Meal — Overnight Fuel",sub:"Reduced carbs · Rest day · Fast begins 5 PM",emoji:"🌿",color:"#6B4FBB",
      items:[{name:"Salmon fillet (cooked)",amt:"200g",p:40,c:0,f:20,cal:350},{name:"Sweet potato (baked)",amt:"120g",p:2,c:24,f:0,cal:103},{name:"Asparagus (roasted)",amt:"150g",p:4,c:6,f:0,cal:34},{name:"Zucchini (roasted)",amt:"120g",p:2,c:4,f:0,cal:21},{name:"Spinach (wilted)",amt:"100g",p:3,c:3,f:0,cal:23},{name:"Bell peppers, mixed (roasted)",amt:"100g",p:1,c:6,f:0,cal:31},{name:"Extra virgin olive oil",amt:"1 tbsp (14g)",p:0,c:0,f:14,cal:119},{name:"Lemon + garlic + turmeric + black pepper",amt:"to taste",p:0,c:1,f:0,cal:5}],
      note:"Reduced sweet potato. Zucchini adds manganese (superoxide dismutase).",
      keys:["EPA/DHA omega-3 (salmon)","Manganese (zucchini)","Vitamin C (bell pepper)","Anti-inflammatory (turmeric)"] },
  ],
  [S]: [
    { id:"s1",time:"5:00 PM",label:"ONLY MEAL",title:"24-Hour Fast Break — Autophagy Refeed",sub:"Sat 5 PM → Sun 5 PM · 24-hr fast · Single meal · Gentle reintroduction",emoji:"🌿",color:"#6B4FBB",
      items:[{name:"Salmon fillet (cooked)",amt:"220g",p:44,c:0,f:22,cal:385},{name:"Bone broth (warm, to start)",amt:"240ml",p:6,c:0,f:1,cal:35},{name:"Asparagus (steamed)",amt:"150g",p:4,c:6,f:0,cal:34},{name:"Spinach (wilted)",amt:"120g",p:4,c:4,f:0,cal:28},{name:"Zucchini (steamed)",amt:"150g",p:3,c:5,f:0,cal:25},{name:"Avocado",amt:"½ medium (75g)",p:1,c:4,f:11,cal:112},{name:"Extra virgin olive oil",amt:"1 tbsp (14g)",p:0,c:0,f:14,cal:119},{name:"Sauerkraut (raw)",amt:"60g",p:1,c:2,f:0,cal:11},{name:"Lemon + garlic + turmeric + black pepper",amt:"to taste",p:0,c:1,f:0,cal:5},{name:"Zena Greens Supergreens (1 stick)",amt:"~11g stick pack",p:1,c:3,f:0,cal:15}],
      note:"Bone broth first — primes digestion. No starches — preserves autophagy. Salmon + avocado deliver fat-soluble vitamins. All supps taken here with meal fat.",
      keys:["Digestive priming (bone broth first)","EPA/DHA anti-inflammatory (salmon)","Autophagy-preserving (no starches)","Fat-soluble nutrient delivery (avocado + olive oil)","Probiotics (sauerkraut + supergreens)"] },
  ],
};

const suppDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const suppByDay = {
  Mon: [
    { time:"4:00 AM",icon:"🙏",label:"Wake · Prayer · Pre-Training Stack",color:"#6B4FBB",
      supps:[{name:"Thorne Methylcobalamin B12",note:"Dissolve under tongue. Does not break fast."},{name:"TL BCAA Glutamine (fasted)",note:"Protects muscle during fasted training."},{name:"TL Vitality (2 caps)",note:"Fasted at 4 AM."},{name:"TL Beast Bulk Pre-Workout",note:"Training in 15 min."},{name:"TL Creatine HMB",note:"3g HMB + creatine blend. Anti-catabolic. Especially effective on strength days."}],warning:null },
    { time:"4:30–8:00 AM",icon:"🏋️",label:"Training — Do or Die + Strength",color:"#B84040",
      supps:[{name:"Water + Electrolytes (sea salt + lite salt)",note:"Sip throughout. 3.5 hrs fasted = high electrolyte loss."}],warning:null },
    { time:"8:00 AM",icon:"🍵",label:"Green Tea + Focus Stack",color:"#C8943A",
      supps:[{name:"Green Tea",note:"EGCG + caffeine. Fat oxidation. Steep 3 min."},{name:"L-Theanine 200mg",note:"Alpha wave clarity for deep work block."}],warning:null },
    { time:"9:00 AM",icon:"🍳",label:"Meal 1 — Break Fast",color:"#3A8F5C",
      supps:[{name:"TL Grass-Fed Whey Isolate",note:"In shake. Fastest leucine spike post-fasted."},{name:"Thorne Creatine Monohydrate (5g)",note:"Mixed into protein shake."},{name:"Real Mushrooms Lion's Mane",note:"NGF support. Consistent AM dosing."},{name:"Momentous Omega-3",note:"Fat-soluble — take with food."},{name:"Thorne D3+K2 Softgels",note:"With food fat."}],warning:"⚠ TL Creatine HMB (4 AM) + Thorne Creatine (9 AM) combined = clinical dose. Do not add more creatine elsewhere." },
    { time:"12:00 PM",icon:"🥬",label:"Meal 2 — Supergreens",color:"#3A8F5C",
      supps:[{name:"Zena Greens Supergreens (1 stick)",note:"In 8–12oz water alongside meal. Probiotics peak in fed state."}],warning:null },
    { time:"8:30 PM",icon:"🌙",label:"Pre-Sleep Recovery",color:"#4A72D4",
      supps:[{name:"Dymatize Elite Casein (1 scoop)",note:"Slow-release protein through 6-hr sleep window."},{name:"Thorne Magnesium Bisglycinate",note:"Deepens sleep, lowers cortisol."}],warning:null },
  ],
  Tue: [
    { time:"4:00 AM",icon:"🙏",label:"Wake · Prayer · Pre-Training Stack",color:"#6B4FBB",
      supps:[{name:"Thorne Methylcobalamin B12",note:"Dissolve under tongue. Does not break fast."},{name:"TL BCAA Glutamine (fasted)",note:"Protects muscle during fasted training."},{name:"TL Vitality (2 caps)",note:"Fasted at 4 AM."},{name:"TL Beast Bulk Pre-Workout",note:"Training in 15 min."},{name:"TL Creatine HMB",note:"Anti-catabolic. High demand on leg/power days."}],warning:null },
    { time:"4:30–8:00 AM",icon:"🏋️",label:"Training — Do or Die + Power",color:"#B84040",
      supps:[{name:"Water + Electrolytes",note:"Sip throughout."}],warning:null },
    { time:"8:00 AM",icon:"🍵",label:"Green Tea + Focus Stack",color:"#C8943A",supps:[{name:"Green Tea",note:"EGCG + caffeine. Fat oxidation."},{name:"L-Theanine 200mg",note:"Alpha wave clarity."}],warning:null },
    { time:"9:00 AM",icon:"🍳",label:"Meal 1 — Break Fast",color:"#3A8F5C",
      supps:[{name:"TL Grass-Fed Whey Isolate",note:"In oats or shake."},{name:"Thorne Creatine Monohydrate (5g)",note:"Mixed into protein shake."},{name:"Real Mushrooms Lion's Mane",note:"Consistent AM dosing."},{name:"Momentous Omega-3",note:"With food fat."},{name:"Thorne D3+K2 Softgels",note:"With food fat."}],warning:null },
    { time:"12:00 PM",icon:"🥬",label:"Meal 2 — Supergreens",color:"#3A8F5C",supps:[{name:"Zena Greens (1 stick)",note:"In water. Probiotics peak fed."}],warning:null },
    { time:"8:30 PM",icon:"🌙",label:"Pre-Sleep Recovery",color:"#4A72D4",
      supps:[{name:"Dymatize Elite Casein (1 scoop)",note:"Slow-release protein through sleep."},{name:"Thorne Magnesium Bisglycinate",note:"Deepens sleep, lowers cortisol."}],warning:null },
  ],
  Wed: [
    { time:"4:00 AM",icon:"🙏",label:"Wake · Prayer · Pre-Training Stack",color:"#6B4FBB",
      supps:[{name:"Thorne Methylcobalamin B12",note:"Dissolve under tongue."},{name:"TL BCAA Glutamine (fasted)",note:"Extra valuable on conditioning days — high catabolic risk fasted."},{name:"TL Vitality (2 caps)",note:"Fasted at 4 AM."},{name:"TL Beast Bulk Pre-Workout",note:"Training in 15 min."},{name:"TL Creatine HMB",note:"Protects muscle during high-volume conditioning."}],warning:null },
    { time:"4:30–8:00 AM",icon:"🏋️",label:"Training — Conditioning Circuit",color:"#B84040",
      supps:[{name:"Water + Electrolytes",note:"Highest sweat loss of week on conditioning day — prioritize."}],warning:null },
    { time:"8:00 AM",icon:"🍵",label:"Green Tea + Focus Stack",color:"#C8943A",supps:[{name:"Green Tea",note:"EGCG + caffeine. Fat oxidation."},{name:"L-Theanine 200mg",note:"Alpha wave clarity."}],warning:null },
    { time:"9:00 AM",icon:"🍳",label:"Meal 1 — Break Fast",color:"#3A8F5C",
      supps:[{name:"TL Grass-Fed Whey Isolate",note:"In oats or shake."},{name:"Thorne Creatine Monohydrate (5g)",note:"Mixed into protein shake."},{name:"Real Mushrooms Lion's Mane",note:"Consistent AM dosing."},{name:"Momentous Omega-3",note:"With food fat."},{name:"Thorne D3+K2 Softgels",note:"With food fat."}],warning:null },
    { time:"12:00 PM",icon:"🥬",label:"Meal 2 — Supergreens",color:"#3A8F5C",supps:[{name:"Zena Greens (1 stick)",note:"In water. Probiotics peak fed."}],warning:null },
    { time:"8:30 PM",icon:"🌙",label:"Pre-Sleep Recovery",color:"#4A72D4",
      supps:[{name:"Dymatize Elite Casein (1 scoop)",note:"Slow-release protein through sleep."},{name:"Thorne Magnesium Bisglycinate",note:"Deepens sleep + scalp recovery."}],warning:null },
  ],
  Thu: [
    { time:"4:00 AM",icon:"🙏",label:"Wake · Prayer · Pre-Training Stack",color:"#6B4FBB",
      supps:[{name:"Thorne Methylcobalamin B12",note:"Dissolve under tongue."},{name:"TL BCAA Glutamine (fasted)",note:"Fasted muscle protection."},{name:"TL Vitality (2 caps)",note:"Fasted at 4 AM."},{name:"TL Beast Bulk Pre-Workout",note:"Training in 15 min."},{name:"TL Creatine HMB",note:"Hypertrophy days — valuable."}],warning:null },
    { time:"4:30–8:00 AM",icon:"🏋️",label:"Training — Do or Die + Hypertrophy",color:"#B84040",
      supps:[{name:"Water + Electrolytes",note:"Sip throughout."}],warning:null },
    { time:"8:00 AM",icon:"🍵",label:"Green Tea + Focus Stack",color:"#C8943A",supps:[{name:"Green Tea",note:"EGCG + caffeine. Fat oxidation."},{name:"L-Theanine 200mg",note:"Alpha wave clarity."}],warning:null },
    { time:"9:00 AM",icon:"🍳",label:"Meal 1 — Break Fast",color:"#3A8F5C",
      supps:[{name:"TL Grass-Fed Whey Isolate",note:"In oats or shake."},{name:"Thorne Creatine Monohydrate (5g)",note:"Mixed into protein shake."},{name:"Real Mushrooms Lion's Mane",note:"Consistent AM dosing."},{name:"Momentous Omega-3",note:"With food fat."},{name:"Thorne D3+K2 Softgels",note:"With food fat."}],warning:null },
    { time:"12:00 PM",icon:"🥬",label:"Meal 2 — Supergreens",color:"#3A8F5C",supps:[{name:"Zena Greens (1 stick)",note:"In water. Probiotics peak fed."}],warning:null },
    { time:"8:30 PM",icon:"🌙",label:"Pre-Sleep Recovery",color:"#4A72D4",
      supps:[{name:"Dymatize Elite Casein (1 scoop)",note:"Slow-release protein through sleep."},{name:"Thorne Magnesium Bisglycinate",note:"Deepens sleep, lowers cortisol."}],warning:null },
  ],
  Fri: [
    { time:"4:00 AM",icon:"🙏",label:"Wake · Prayer · Pre-Training Stack",color:"#6B4FBB",
      supps:[{name:"Thorne Methylcobalamin B12",note:"Dissolve under tongue."},{name:"TL BCAA Glutamine (fasted)",note:"Fasted muscle protection."},{name:"TL Vitality (2 caps)",note:"Fasted at 4 AM."},{name:"TL Beast Bulk Pre-Workout",note:"Training in 15 min."},{name:"TL Creatine HMB",note:"Posterior chain — HMB critical."}],warning:null },
    { time:"4:30–8:00 AM",icon:"🏋️",label:"Training — Do or Die + Posterior",color:"#B84040",
      supps:[{name:"Water + Electrolytes",note:"Sip throughout."}],warning:null },
    { time:"8:00 AM",icon:"🍵",label:"Green Tea + Focus Stack",color:"#C8943A",supps:[{name:"Green Tea",note:"EGCG + caffeine. Fat oxidation."},{name:"L-Theanine 200mg",note:"Alpha wave clarity."}],warning:null },
    { time:"9:00 AM",icon:"🍳",label:"Meal 1 — Break Fast",color:"#3A8F5C",
      supps:[{name:"TL Grass-Fed Whey Isolate",note:"In oats or shake."},{name:"Thorne Creatine Monohydrate (5g)",note:"Mixed into protein shake."},{name:"Real Mushrooms Lion's Mane",note:"Consistent AM dosing."},{name:"Momentous Omega-3",note:"With food fat."},{name:"Thorne D3+K2 Softgels",note:"With food fat."}],warning:null },
    { time:"12:00 PM",icon:"🥬",label:"Meal 2 — Supergreens",color:"#3A8F5C",supps:[{name:"Zena Greens (1 stick)",note:"In water. Probiotics peak fed."}],warning:null },
    { time:"8:30 PM",icon:"🌙",label:"Pre-Sleep Recovery",color:"#4A72D4",
      supps:[{name:"Dymatize Elite Casein (1 scoop)",note:"Slow-release protein. Last training night — full overnight repair window."},{name:"Thorne Magnesium Bisglycinate",note:"Critical after heavy posterior chain work. Deepens sleep."}],warning:null },
  ],
  Sat: [
    { time:"4:00 AM",icon:"🙏",label:"Wake · Prayer · Pre-Training Stack",color:"#6B4FBB",
      supps:[{name:"Thorne Methylcobalamin B12",note:"Dissolve under tongue."},{name:"TL BCAA Glutamine (fasted)",note:"Protects muscle during Operator circuit."},{name:"TL Vitality (2 caps)",note:"Fasted at 4 AM."},{name:"TL Beast Bulk Pre-Workout",note:"Training in 15 min."},{name:"TL Creatine HMB",note:"Potent for 400m run sets — reduces aerobic muscle damage."}],warning:null },
    { time:"4:30–8:00 AM",icon:"🏋️",label:"Training — Operator Circuit",color:"#B84040",
      supps:[{name:"Water + Electrolytes",note:"Highest aerobic demand of the week."}],warning:null },
    { time:"8:00 AM",icon:"🍵",label:"Green Tea + Focus Stack",color:"#C8943A",supps:[{name:"Green Tea",note:"EGCG + caffeine. Fat oxidation."},{name:"L-Theanine 200mg",note:"Alpha wave clarity."}],warning:null },
    { time:"9:00 AM",icon:"🍳",label:"Meal 1 — Break Fast",color:"#3A8F5C",
      supps:[{name:"TL Grass-Fed Whey Isolate",note:"In oats or shake."},{name:"Thorne Creatine Monohydrate (5g)",note:"Mixed into protein shake."},{name:"Real Mushrooms Lion's Mane",note:"Consistent AM dosing."},{name:"Momentous Omega-3",note:"With food fat."},{name:"Thorne D3+K2 Softgels",note:"With food fat."}],warning:null },
    { time:"12:00 PM",icon:"🥬",label:"Meal 2 — Supergreens",color:"#3A8F5C",supps:[{name:"Zena Greens (1 stick)",note:"In water. Probiotics peak fed."}],warning:null },
    { time:"5:00 PM",icon:"🔒",label:"Eating Window Closes — 24-Hr Fast Begins",color:"#1E2022",
      supps:[{name:"Water + Electrolytes only",note:"Sat 5 PM → Sun 5 PM. No supplements until Sunday's single meal."}],warning:null },
    { time:"8:30 PM",icon:"🌙",label:"Pre-Sleep Recovery",color:"#4A72D4",
      supps:[{name:"Dymatize Elite Casein (1 scoop)",note:"Minimal insulin response. Feeds muscle overnight."},{name:"Thorne Magnesium Bisglycinate",note:"Does not break fast. Even more effective in fasted state."}],warning:"⚠ Casein during the 24-hr fast is a personal call. If strict autophagy is the goal, skip it tonight and resume Sunday 8:30 PM." },
  ],
  Sun: [
    { time:"4:00 AM",icon:"🙏",label:"Wake · Prayer — Fast Continues",color:"#6B4FBB",
      supps:[{name:"Thorne Methylcobalamin B12 sublingual",note:"Only supplement before 5 PM."},{name:"Water + Electrolytes all day",note:"Sea salt + lite salt. Fasted all day."}],warning:null },
    { time:"4:30–8:00 AM",icon:"🧘",label:"Mobility + Recovery Session",color:"#3A8F5C",
      supps:[{name:"No Pre-Workout, BCAAs, Creatine, or HMB today",note:"Rest day — skip all performance supps."}],warning:null },
    { time:"8:00 AM",icon:"🍵",label:"Green Tea Only",color:"#C8943A",
      supps:[{name:"Green Tea",note:"Extends autophagy. Does not break fast."},{name:"L-Theanine (optional)",note:"Fine to take. Won't break fast."}],warning:null },
    { time:"5:00 PM",icon:"🌿",label:"Break Fast — Autophagy Refeed + All Supps",color:"#6B4FBB",
      supps:[{name:"TL Grass-Fed Whey Isolate (optional)",note:"Mix into meal if protein is low."},{name:"TL Vitality (2 caps)",note:"Best absorption of the week."},{name:"Thorne D3+K2 Softgels",note:"With meal fat."},{name:"Momentous Omega-3",note:"With meal fat."},{name:"Real Mushrooms Lion's Mane",note:"Daily dosing with meal."},{name:"Zena Greens Supergreens (1 stick)",note:"In water alongside meal."}],
      warning:"⚠ Bone broth first, then full meal, then capsules. Let digestion prime before taking supps after 24 hrs fasted." },
    { time:"8:30 PM",icon:"🌙",label:"Pre-Sleep Recovery",color:"#4A72D4",
      supps:[{name:"Dymatize Elite Casein (1 scoop)",note:"Gut primed after refeed. Feeds muscle overnight."},{name:"Thorne Magnesium Bisglycinate",note:"HGH pulse is strongest after 24-hr fast. Magnesium deepens the sleep quality to maximize it."}],warning:null },
  ],
};

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

const PM_STACK = [{num:"1",product:"The Ordinary Multi-Peptide Serum",instruction:"Apply to scalp sections. Massage 60 sec.",note:null},{num:"2",product:"PRSP Root Revive",instruction:"5–6 drops. Circular massage 90 sec.",note:null},{num:"3",product:"Pumpkin Seed Oil",instruction:"3–4 drops to scalp.",note:null},{num:"4",product:"Jojoba Oil",instruction:"Pea-sized to ends only.",note:null},{num:"5",product:"Satin Bonnet / Durag",instruction:"Cover before sleep.",note:null}];

// ─── HAIR ───────────────────────────────────────────────────────
// Wed = Briogeo scalp exfoliation wash (no conditioner)
// Sun = Mielle shampoo + conditioner (moisture reset)
const hairDays = [
  { day:"Mon",tag:"LASER + DAILY",emoji:"🔴",color:"#C8943A",type:"iRestore + Morning + Evening",focus:["iRestore Laser Cap","Rogaine","Activator","Nightly Stack"],roll:false,washSteps:false,washType:null,
    am:[{num:"1",product:"iRestore Laser Cap — 25 min",instruction:"Place on dry, clean scalp at 4 AM. Sit or work during session. No products beforehand.",note:"LLLT boosts scalp blood flow + cellular ATP. Rogaine applied right after penetrates significantly better."},{num:"2",product:"Rogaine 5% Minoxidil Foam",instruction:"Apply to dry scalp immediately after iRestore session ends. Half a cap. Air dry 5–10 min.",note:"Never apply oils before Rogaine dries. Wash hands immediately."},{num:"3",product:"Copenhagen Grooming Activator",instruction:"8–10 drops to hairline, temples, edges. Massage 60 sec.",note:"Apply 10 min after Rogaine is fully dry."}],
    pm:[{num:"1",product:"The Ordinary Multi-Peptide Serum",instruction:"Apply to scalp sections. Massage 60 sec.",note:null},{num:"2",product:"PRSP Root Revive",instruction:"5–6 drops to scalp. Circular massage 90 sec.",note:null},{num:"3",product:"Pumpkin Seed Oil",instruction:"3–4 drops to scalp. Focus on thinning areas.",note:null},{num:"4",product:"Jojoba Oil",instruction:"Pea-sized to mid-lengths and ENDS ONLY. Not scalp.",note:"Seals moisture overnight."},{num:"5",product:"Satin Bonnet / Durag",instruction:"Cover before sleep.",note:null}] },
  { day:"Tue",tag:"DAILY",emoji:"🌅",color:"#C8943A",type:"Morning + Evening",focus:["Rogaine","Activator","Nightly Stack"],roll:false,washSteps:false,washType:null,
    am:[{num:"1",product:"Rogaine 5% Minoxidil Foam",instruction:"Apply to dry scalp. Half a cap. Air dry 5–10 min.",note:null},{num:"2",product:"Copenhagen Grooming Activator",instruction:"8–10 drops to hairline. Massage 60 sec.",note:"10 min after Rogaine dries."}],
    pm:PM_STACK },
  { day:"Wed",tag:"WASH + ROLL",emoji:"🚿",color:"#27AE60",type:"Scalp Exfoliation + Derma Roll",focus:["Skip Rogaine","Briogeo Scalp Exfoliation","Derma Roll PM"],roll:true,washSteps:true,washType:"briogeo",
    am:[{num:"1",product:"Copenhagen Activator ONLY — skip Rogaine",instruction:"Apply to hairline/temples as normal.",note:"⚠ SKIP Rogaine this morning. Derma roll tonight = microchannels open. Resume Thursday 4 AM."}],
    prewash:[{num:"1",product:"Black Castor Oil",instruction:"Section hair. Scalp massage 5–10 min.",note:"Loosens buildup and stimulates circulation before exfoliation."},{num:"2",product:"Wait 15–20 min",instruction:"Cover with plastic cap.",note:"Castor oil primes scalp — do not skip."}],
    wash:[{num:"1",product:"Briogeo Scalp Revival — Charcoal + Coconut Oil",instruction:"Apply to wet scalp. Circular massage 3–5 min. Focus on buildup areas.",note:"Charcoal draws out buildup. Beads unclog follicles."},{num:"2",product:"Rinse Thoroughly",instruction:"Rinse until water runs clear.",note:"No conditioner on Briogeo days — LOC provides moisture."},{num:"3",product:"Rinse — Cool Water Final Rinse",instruction:"Cool water final rinse.",note:null}],
    loc:[{num:"L",product:"Camille Rose Curl Love (Leave-in)",instruction:"Section by section to damp hair. Rake through.",note:null},{num:"O",product:"Jojoba Oil",instruction:"Small amount over Curl Love each section.",note:null},{num:"C",product:"Asiam DoubleButter Cream",instruction:"Apply and scrunch in.",note:null}],
    pm:[{num:"1",product:"Sanitize Roller",instruction:"70% IPA spray. Wait 5 min.",note:"0.5–0.75mm. Replace every 10–12 uses."},{num:"2",product:"Derma Roll Scalp",instruction:"H, V, diagonal passes. 4–5 each. Light pressure.",note:null},{num:"3",product:"The Ordinary (immediately post-roll)",instruction:"Apply immediately post-roll — 3–4× deeper penetration.",note:null},{num:"4",product:"Root Revive + Pumpkin Seed Oil",instruction:"Follow nightly order.",note:null},{num:"5",product:"Jojoba + Bonnet",instruction:"Seal ends. Cover. Sanitize roller.",note:null}] },
  { day:"Thu",tag:"LASER + DAILY",emoji:"🔴",color:"#C8943A",type:"iRestore + Morning + Evening",focus:["iRestore Laser Cap","Rogaine","Activator","Nightly Stack"],roll:false,washSteps:false,washType:null,
    am:[{num:"1",product:"iRestore Laser Cap — 25 min",instruction:"Place on dry, clean scalp at 4 AM. No products beforehand.",note:"LLLT boosts scalp blood flow + cellular ATP. Rogaine applied right after penetrates significantly better."},{num:"2",product:"Rogaine 5% Minoxidil Foam",instruction:"Apply immediately after iRestore session. Half a cap. Air dry 5–10 min.",note:null},{num:"3",product:"Copenhagen Grooming Activator",instruction:"8–10 drops to hairline. Massage 60 sec.",note:"10 min after Rogaine dries."}],
    pm:PM_STACK },
  { day:"Fri",tag:"DAILY",emoji:"🌅",color:"#C8943A",type:"Morning + Evening",focus:["Rogaine","Activator","Nightly Stack"],roll:false,washSteps:false,washType:null,
    am:[{num:"1",product:"Rogaine 5% Minoxidil Foam",instruction:"Dry scalp. Half cap. Air dry 5–10 min.",note:null},{num:"2",product:"Copenhagen Activator",instruction:"8–10 drops, massage 60 sec.",note:"10 min after Rogaine dries."}],
    pm:PM_STACK },
  { day:"Sat",tag:"LASER + DAILY",emoji:"🔴",color:"#C8943A",type:"iRestore + Morning + Evening",focus:["iRestore Laser Cap","Rogaine","Activator","Nightly Stack"],roll:false,washSteps:false,washType:null,
    am:[{num:"1",product:"iRestore Laser Cap — 25 min",instruction:"Place on dry, clean scalp at 4 AM. No products beforehand.",note:"LLLT boosts scalp blood flow + cellular ATP. Rogaine applied right after penetrates significantly better."},{num:"2",product:"Rogaine 5% Minoxidil Foam",instruction:"Apply immediately after iRestore session. Half a cap. Air dry 5–10 min.",note:null},{num:"3",product:"Copenhagen Grooming Activator",instruction:"8–10 drops to hairline. Massage 60 sec.",note:"10 min after Rogaine dries."}],
    pm:PM_STACK },
  { day:"Sun",tag:"WASH + ROLL",emoji:"💆",color:"#C8943A",type:"Moisture Reset + Derma Roll",focus:["Skip Rogaine","Mielle Shampoo + Conditioner","Derma Roll PM"],roll:true,washSteps:true,washType:"mielle",
    am:[{num:"1",product:"Copenhagen Activator ONLY — skip Rogaine",instruction:"Apply to hairline/temples as normal.",note:"⚠ SKIP Rogaine this morning. Derma roll tonight. Resume Monday 4 AM."}],
    prewash:[{num:"1",product:"Black Castor Oil",instruction:"Section hair. Scalp massage 5–10 min.",note:"Stimulates circulation and protects roots."},{num:"2",product:"Batana Oil",instruction:"Apply to mid-lengths and ends. Comb through gently.",note:"Cold-pressed from American palm nuts. Rich in tocotrienols (Vit E family) and oleic acid — one of the most potent oils for hair growth and end repair."},{num:"3",product:"Wait 20–30 min",instruction:"Cover with plastic cap.",note:null}],
    wash:[{num:"1",product:"Mielle Pomegranate & Honey Shampoo — Sulfate-Free",instruction:"Wet hair. Lather, massage 2–3 min. Rinse well.",note:"Sulfate-free. Formulated for Type 4."},{num:"2",product:"Mielle Pomegranate & Honey Conditioner",instruction:"Apply to mid-lengths + ends. Wide-tooth comb. Leave 5–10 min.",note:"Deep hydration for Type 4 detangling."},{num:"3",product:"Rinse — Cool Water",instruction:"Cool water final rinse.",note:null}],
    loc:[{num:"L",product:"Camille Rose Curl Love (Leave-in)",instruction:"Apply section by section to damp hair. Rake through.",note:"Layer over the conditioner moisture."},{num:"O",product:"Jojoba Oil",instruction:"Small amount over Curl Love each section.",note:"Seals moisture into shaft."},{num:"C",product:"Asiam DoubleButter Cream",instruction:"Apply and scrunch in.",note:"Final seal + curl definition."}],
    pm:[{num:"1",product:"Sanitize Roller",instruction:"70% isopropyl alcohol. Wait 5 min.",note:null},{num:"2",product:"Derma Roll Scalp",instruction:"Horizontal, vertical, diagonal. 4–5 passes. Light pressure.",note:null},{num:"3",product:"The Ordinary (immediately post-roll)",instruction:"Apply immediately for maximum penetration.",note:null},{num:"4",product:"Root Revive + Pumpkin Seed Oil",instruction:"Follow nightly order.",note:null},{num:"5",product:"Jojoba + Bonnet",instruction:"Seal ends. Cover.",note:null}] },
];

const hairRules = [
  {icon:"⚠",color:"#C0392B",text:"NEVER apply Rogaine within 24 hrs after derma rolling — skip Wed & Sun mornings."},
  {icon:"⚠",color:"#C0392B",text:"NEVER use iRestore on derma roll days (Wed/Sun) — LLLT + microneedling same day = overstimulation."},
  {icon:"⚠",color:"#C0392B",text:"NEVER apply oils to scalp before Rogaine or iRestore — clean dry scalp only for both."},
  {icon:"⚠",color:"#C0392B",text:"NEVER derma roll on an unwashed scalp — wash day timing is mandatory."},
  {icon:"💡",color:"#C9A84C",text:"iRestore schedule: Mon / Thu / Sat — every other day, never on derma roll days. Always before Rogaine."},
  {icon:"💡",color:"#C9A84C",text:"iRestore → Rogaine sequence is intentional. LLLT increases scalp receptivity — Rogaine penetrates better right after."},
  {icon:"💡",color:"#C9A84C",text:"Wed = Briogeo (scalp exfoliation). Sun = Mielle (moisture reset). Do not swap — they serve different purposes."},
  {icon:"💡",color:"#C9A84C",text:"No conditioner on Briogeo days — charcoal + LOC method is sufficient. Conditioner on Mielle days only."},
  {icon:"✅",color:"#27AE60",text:"Freshly exfoliated scalp on Wednesday = best derma roll + The Ordinary penetration of the week."},
  {icon:"✅",color:"#27AE60",text:"LOC order is non-negotiable: Leave-in → Oil → Cream. Always on damp hair."},
  {icon:"✅",color:"#27AE60",text:"Batana Oil on ends only (pre-wash). Rich in tocotrienols — superior to Babassu for growth and repair."},
];

// ─── SKIN ───────────────────────────────────────────────────────
const skinDays = [
  { day:"Mon",tag:"FADED",emoji:"✨",color:"#E8A0BF",type:"AM Brighten + Topicals Faded PM",focus:["SA Cleanse AM","Faded Bar","Faded Serum","Eye Masks"],
    am:[{num:"1",product:"CeraVe Acne Control Cleanser (2% Salicylic Acid)",instruction:"Lather 60 sec. Rinse thoroughly.",note:"Fully rinse — residual SA can interact with Vit C."},{num:"2",product:"Vitamin C Serum (Debaiy VC)",instruction:"3–4 drops. Wait 3 min.",note:"AM only. Never with Niacinamide."},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin over Vit C.",note:"Damp = deeper penetration."},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"3–4 drops on dark spots.",note:"Strongest brightening combo."},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Neutrogena Ultra Sheer Dry-Touch SPF 70",instruction:"Apply generously — last step.",note:"SPF 70. Dry-touch. Wait 60 sec before going out."}],
    pm:[{num:"1",product:"Topicals Faded Brightening Bar",instruction:"Lather on wet face. Let sit 60 sec. Rinse thoroughly.",note:"Replaces SA cleanser tonight. Kojic acid + Azelaic acid + Niacinamide cleanse."},{num:"2",product:"Topicals Faded Brightening Serum",instruction:"Apply all over face after cleansing.",note:"⚠ DO NOT layer with AHAs, BHAs, or Retinol — no Glycolic, no SA active, no Retinol same session."},{num:"3",product:"Hyaluronic Acid Serum",instruction:"Layer over Faded Serum.",note:null},{num:"4",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"5",product:"Vitamin E Oil",instruction:"Final step.",note:null},{num:"6",product:"Topicals Faded Eye Masks",instruction:"Apply to clean under-eye area. Leave 15 min.",note:"Refrigerate before use for extra depuffing effect."}] },
  { day:"Tue",tag:"RETINOL",emoji:"🧬",color:"#6B4FBB",type:"AM Brighten + Retinol Sandwich PM",focus:["SA Cleanse","Vit C Stack","Retinol Sandwich"],
    am:[{num:"1",product:"CeraVe Acne Control Cleanser (2% Salicylic Acid)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus on dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Neutrogena Ultra Sheer SPF 70",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"CeraVe Acne Control Cleanser (2% Salicylic Acid)",instruction:"Cleanse. Rinse. Pat dry. Wait 10–15 min.",note:"Dry time before retinol reduces irritation."},{num:"2",product:"Niacinamide 10% + Zinc 1%",instruction:"Full face. Wait 5 min.",note:"Sandwich step 1."},{num:"3",product:"Retinol 0.5% in Squalane",instruction:"Full face — avoid eye area.",note:"Never same night as Glycolic."},{num:"4",product:"Hyaluronic Acid Serum",instruction:"Over retinol.",note:"Sandwich step 3."},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Vitamin E Oil",instruction:"Final seal.",note:null}] },
  { day:"Wed",tag:"FADED",emoji:"✨",color:"#E8A0BF",type:"AM Brighten + Topicals Faded PM",focus:["SA Cleanse AM","Faded Bar","Faded Serum","Eye Masks"],
    am:[{num:"1",product:"CeraVe Acne Control Cleanser (2% Salicylic Acid)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Neutrogena Ultra Sheer SPF 70",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"Topicals Faded Brightening Bar",instruction:"Lather on wet face. Let sit 60 sec. Rinse thoroughly.",note:"Kojic acid + Azelaic acid + Niacinamide cleanse."},{num:"2",product:"Topicals Faded Brightening Serum",instruction:"Apply all over face after cleansing.",note:"⚠ DO NOT layer with AHAs, BHAs, or Retinol same session."},{num:"3",product:"Hyaluronic Acid Serum",instruction:"Layer over Faded Serum.",note:null},{num:"4",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"5",product:"Vitamin E Oil",instruction:"Final step.",note:null},{num:"6",product:"Topicals Faded Eye Masks",instruction:"Apply to clean under-eye area. Leave 15 min.",note:"Refrigerate before use for extra depuffing."}] },
  { day:"Thu",tag:"RETINOL",emoji:"🧬",color:"#6B4FBB",type:"AM Brighten + Retinol Sandwich PM",focus:["SA Cleanse","Vit C Stack","Retinol Sandwich"],
    am:[{num:"1",product:"CeraVe Acne Control Cleanser (2% Salicylic Acid)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Neutrogena Ultra Sheer SPF 70",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"CeraVe Acne Control Cleanser (2% Salicylic Acid)",instruction:"Cleanse. Pat dry. Wait 10–15 min.",note:null},{num:"2",product:"Niacinamide 10% + Zinc 1%",instruction:"Full face. Wait 5 min.",note:null},{num:"3",product:"Retinol 0.5% in Squalane",instruction:"Full face. Avoid eye area.",note:null},{num:"4",product:"Hyaluronic Acid Serum",instruction:"Over retinol.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Vitamin E Oil",instruction:"Final seal.",note:null}] },
  { day:"Fri",tag:"FADED",emoji:"✨",color:"#E8A0BF",type:"AM Brighten + Topicals Faded PM",focus:["SA Cleanse AM","Faded Bar","Faded Serum","Eye Masks"],
    am:[{num:"1",product:"CeraVe Acne Control Cleanser (2% Salicylic Acid)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Neutrogena Ultra Sheer SPF 70",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"Topicals Faded Brightening Bar",instruction:"Lather on wet face. Let sit 60 sec. Rinse thoroughly.",note:"Kojic acid + Azelaic acid + Niacinamide cleanse."},{num:"2",product:"Topicals Faded Brightening Serum",instruction:"Apply all over face after cleansing.",note:"⚠ DO NOT layer with AHAs, BHAs, or Retinol same session."},{num:"3",product:"Hyaluronic Acid Serum",instruction:"Layer over Faded Serum.",note:null},{num:"4",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"5",product:"Vitamin E Oil",instruction:"Final step.",note:null},{num:"6",product:"Topicals Faded Eye Masks",instruction:"Apply to clean under-eye area. Leave 15 min.",note:"Refrigerate before use for extra depuffing."}] },
  { day:"Sat",tag:"RETINOL",emoji:"🧬",color:"#6B4FBB",type:"AM Brighten + Retinol Sandwich PM",focus:["SA Cleanse","Vit C Stack","Retinol Sandwich"],
    am:[{num:"1",product:"CeraVe Acne Control Cleanser (2% Salicylic Acid)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Neutrogena Ultra Sheer SPF 70",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"CeraVe Acne Control Cleanser (2% Salicylic Acid)",instruction:"Cleanse. Pat dry. Wait 10–15 min.",note:null},{num:"2",product:"Niacinamide 10% + Zinc 1%",instruction:"Full face. Wait 5 min.",note:null},{num:"3",product:"Retinol 0.5% in Squalane",instruction:"Full face. Avoid eye area.",note:null},{num:"4",product:"Hyaluronic Acid Serum",instruction:"Over retinol.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Vitamin E Oil",instruction:"Final seal.",note:null}] },
  { day:"Sun",tag:"MASK + REST",emoji:"🧖",color:"#B84040",type:"Barrier Rebuild + Aztec Clay Mask",focus:["SA Cleanse","Aztec Clay Mask","Barrier Rebuild"],
    am:[{num:"1",product:"CeraVe Acne Control Cleanser (2% Salicylic Acid)",instruction:"Lather 60 sec. Rinse.",note:null},{num:"2",product:"Vitamin C Serum",instruction:"3–4 drops. Wait 3 min.",note:null},{num:"3",product:"Hyaluronic Acid Serum",instruction:"On damp skin.",note:null},{num:"4",product:"Alpha Arbutin 2% + HA",instruction:"Focus dark spots.",note:null},{num:"5",product:"Cetaphil Moisturizer",instruction:"Seal.",note:null},{num:"6",product:"Neutrogena Ultra Sheer SPF 70",instruction:"Final step.",note:null}],
    pm:[{num:"1",product:"CeraVe Acne Control Cleanser (2% Salicylic Acid)",instruction:"Gentle cleanse. Rinse. Pat dry.",note:null},{num:"2",product:"Aztec Clay Mask + Apple Cider Vinegar",instruction:"Mix equal parts clay + ACV. Apply thin layer. Leave 10–15 min. Remove while still slightly damp.",note:"⚠ Remove while damp — cracking = barrier damage. NO other actives PM on mask night. 1× per week only."},{num:"3",product:"Hyaluronic Acid Serum",instruction:"Apply immediately after rinsing — skin stripped and thirsty.",note:null},{num:"4",product:"Cetaphil Moisturizer",instruction:"Apply generously.",note:null},{num:"5",product:"Vitamin E Oil",instruction:"Full face — most generous of the week.",note:"Replenishes lipid barrier after deep clay treatment."},{num:"6",product:"Avjone Collagen Gold Eye Mask",instruction:"Under eyes while Vitamin E absorbs. 15–20 min.",note:null}] },
];

const skinRules = [
  {icon:"⚠",color:"#C0392B",text:"NEVER use Vitamin C and Niacinamide same session — Vit C = AM only, Niacinamide = PM only."},
  {icon:"⚠",color:"#C0392B",text:"NEVER use Retinol + Glycolic same night."},
  {icon:"⚠",color:"#C0392B",text:"NEVER use Faded Serum with AHAs, BHAs, or Retinol — box explicitly warns against this."},
  {icon:"⚠",color:"#C0392B",text:"NEVER use any other active PM on Aztec mask night — standalone only."},
  {icon:"✅",color:"#27AE60",text:"SPF 70 every morning — SA, Vit C, Retinol, Glycolic, Kojic, Tranexamic all increase photosensitivity."},
  {icon:"💡",color:"#C9A84C",text:"Faded nights (Mon/Wed/Fri): Faded Bar replaces SA cleanser. Faded Serum replaces Glycolic/Niacinamide stack. Simpler, more targeted."},
  {icon:"💡",color:"#C9A84C",text:"Glycolic exfoliation moves to Tue/Thu only — paired with Retinol sandwich. Keeps exfoliation consistent without conflict."},
  {icon:"💡",color:"#C9A84C",text:"Allow 10–15 min dry time after SA cleanse before Retinol on Tue/Thu — reduces irritation."},
  {icon:"✅",color:"#27AE60",text:"Remove Aztec mask while still slightly damp — cracking = barrier damage."},
  {icon:"✅",color:"#27AE60",text:"Apply HA on slightly damp skin — always. Damp skin = deeper penetration."},
  {icon:"💡",color:"#C9A84C",text:"Refrigerate Faded Eye Masks before use — caffeine + cold temperature maximally reduces puffiness."},
];

// ─── NECK + JAW ─────────────────────────────────────────────────
const neckJawDays = [
  { day:"Mon",tag:"NECK STRENGTH",emoji:"💪",color:"#B84040",type:"Weighted Neck Training",
    focus:["10lb Neck Flexion","Lateral Raises","Neck Bridges"],
    frequency:"2× per week (Mon + Thu)",
    exercises:[
      {name:"Weighted Neck Flexion",sets:"4",reps:"15",rest:"60 sec",instruction:"On back, 10lb on forehead (towel). Chin to chest. Full ROM.",note:"Primary anterior neck builder."},
      {name:"Weighted Neck Extension",sets:"4",reps:"15",rest:"60 sec",instruction:"Face down on bed edge, 10lb on back of head. Lower, raise to neutral.",note:"Posterior neck + trap thickness."},
      {name:"Weighted Lateral Neck Raise",sets:"3",reps:"12 each side",rest:"60 sec",instruction:"On side, 10lb on head. Lateral raise.",note:"Builds SCM — the visible neck column."},
      {name:"Neck Bridge (Bodyweight)",sets:"3",reps:"30 sec hold",rest:"45 sec",instruction:"Crown of head on mat, bridge. Gentle circular rolls.",note:"Full stabilizer activation. Stop if sharp pain."},
      {name:"Chin Tucks",sets:"3",reps:"15",rest:"30 sec",instruction:"Pull chin straight back. Hold 2 sec.",note:"Corrects forward head posture. Sharpens jawline."},
    ]},
  { day:"Tue",tag:"JAW + FACE",emoji:"🗿",color:"#C8943A",type:"Jaw + Facial Definition",
    frequency:"2× per week (Tue + Fri)",
    focus:["Jaw Exerciser","Mewing","Facial Resistance"],
    exercises:[
      {name:"Jaw Exerciser — Warm-Up Sets",sets:"3",reps:"30 chews",rest:"30 sec",instruction:"Use jaw exerciser at lower resistance. Slow controlled chew — full open, full close. Both sides equal.",note:null},
      {name:"Jaw Exerciser — Working Sets",sets:"5",reps:"20 chews",rest:"60 sec",instruction:"Increase resistance. Deliberate tempo — 2 sec close, 1 sec hold, 2 sec open.",note:null},
      {name:"Tongue Press (Mewing Protocol)",sets:"3",reps:"60 sec hold",rest:"30 sec",instruction:"Entire tongue flat on roof of mouth. Back third of tongue especially. Breathe through nose. Maintain throughout day.",note:null},
      {name:"Cheekbone Resistance Press",sets:"3",reps:"15",rest:"30 sec",instruction:"Place fingers on cheekbones. Smile wide against finger resistance. Hold 3 sec.",note:null},
      {name:"Neck Pull (SCM Definition)",sets:"3",reps:"12 each side",rest:"30 sec",instruction:"Turn head 45° to one side. Place hand on forehead. Push head forward against hand resistance. Hold 3 sec.",note:null},
      {name:"Brow Resistance Press",sets:"3",reps:"15",rest:"30 sec",instruction:"Place fingers above eyebrows. Raise eyebrows against resistance. Hold 2 sec.",note:null},
    ]},
  { day:"Wed",tag:"MOBILITY",emoji:"🌊",color:"#3A8F5C",type:"Neck Mobility + Decompression",
    frequency:"2× per week (Wed + Sat)",
    focus:["Cervical Decompression","SCM Stretch","Hyoid Work"],
    exercises:[
      {name:"Cervical Side Stretch",sets:"2",reps:"45 sec each side",rest:"20 sec",instruction:"Ear to shoulder. Opposite hand pulls down. Deep breathing.",note:null},
      {name:"SCM Stretch",sets:"2",reps:"45 sec each side",rest:"20 sec",instruction:"Head 45°, tilt back. Feel pull along front of neck.",note:null},
      {name:"Jaw Stretch + TMJ Mobilization",sets:"2",reps:"10",rest:"20 sec",instruction:"Open wide, hold 5 sec. Jaw circles.",note:null},
      {name:"Hyoid Bone Stretch",sets:"2",reps:"10",rest:"20 sec",instruction:"Swallow, tongue to roof, head back.",note:"Tightens under-jaw — sharpens jawline from below."},
      {name:"Levator Scapulae Stretch",sets:"2",reps:"45 sec each side",rest:"20 sec",instruction:"Hand behind back. Turn 45°, chin toward armpit.",note:"Releases neck-shoulder junction."},
      {name:"Tongue Circles",sets:"2",reps:"20 circles",rest:"15 sec",instruction:"Tongue traces full circle inside lips. Both directions.",note:null},
    ]},
  { day:"Thu",tag:"NECK STRENGTH",emoji:"💪",color:"#B84040",type:"Weighted Neck Training",
    frequency:"2× per week (Mon + Thu)",
    focus:["10lb Neck Flexion","Lateral Raises","Neck Bridges"],
    exercises:[
      {name:"Weighted Neck Flexion",sets:"4",reps:"15",rest:"60 sec",instruction:"Lie on back. 10lb on forehead with towel. Chin to chest. Full ROM.",note:null},
      {name:"Weighted Neck Extension",sets:"4",reps:"15",rest:"60 sec",instruction:"Lie face down on bed edge. 10lb on back of head.",note:null},
      {name:"Weighted Lateral Neck Raise",sets:"3",reps:"12 each side",rest:"60 sec",instruction:"Lie on side. 10lb on side of head. Lateral raise.",note:null},
      {name:"Neck Bridge",sets:"3",reps:"30 sec hold",rest:"45 sec",instruction:"Crown of head on mat. Gentle circular rolls.",note:null},
      {name:"Chin Tucks",sets:"3",reps:"15",rest:"30 sec",instruction:"Pull chin straight back. Hold 2 sec.",note:"Do these throughout the day too — every hour if possible."},
    ]},
  { day:"Fri",tag:"JAW + FACE",emoji:"🗿",color:"#C8943A",type:"Jaw + Facial Definition",
    frequency:"2× per week (Tue + Fri)",
    focus:["Jaw Exerciser","Mewing","Facial Resistance"],
    exercises:[
      {name:"Jaw Exerciser — Warm-Up Sets",sets:"3",reps:"30 chews",rest:"30 sec",instruction:"Lower resistance. Full controlled range.",note:null},
      {name:"Jaw Exerciser — Working Sets",sets:"5",reps:"20 chews",rest:"60 sec",instruction:"Full resistance. 2 sec close, 1 sec hold, 2 sec open.",note:null},
      {name:"Tongue Press (Mewing Protocol)",sets:"3",reps:"60 sec hold",rest:"30 sec",instruction:"Full tongue on roof of mouth. Breathe through nose.",note:null},
      {name:"Cheekbone Resistance Press",sets:"3",reps:"15",rest:"30 sec",instruction:"Fingers on cheekbones. Smile wide against resistance. 3 sec hold.",note:null},
      {name:"Neck Pull (SCM Definition)",sets:"3",reps:"12 each side",rest:"30 sec",instruction:"Turn 45°. Hand on forehead. Push forward against resistance.",note:null},
      {name:"Brow Resistance Press",sets:"3",reps:"15",rest:"30 sec",instruction:"Fingers above brows. Raise against resistance. 2 sec hold.",note:null},
    ]},
  { day:"Sat",tag:"MOBILITY",emoji:"🌊",color:"#3A8F5C",type:"Neck Mobility + Decompression",
    frequency:"2× per week (Wed + Sat)",
    focus:["Cervical Decompression","SCM Stretch","Hyoid Work"],
    exercises:[
      {name:"Cervical Side Stretch",sets:"2",reps:"45 sec each side",rest:"20 sec",instruction:"Ear to shoulder. Opposite hand pulls down gently.",note:null},
      {name:"SCM Stretch",sets:"2",reps:"45 sec each side",rest:"20 sec",instruction:"Head turned 45°, tilt back slightly.",note:null},
      {name:"Jaw Stretch + TMJ Mobilization",sets:"2",reps:"10",rest:"20 sec",instruction:"Open wide, hold, then jaw circles.",note:null},
      {name:"Hyoid Bone Stretch",sets:"2",reps:"10",rest:"20 sec",instruction:"Swallow, tongue to roof, head back.",note:null},
      {name:"Levator Scapulae Stretch",sets:"2",reps:"45 sec each side",rest:"20 sec",instruction:"Hand behind back, turn head 45°, chin to armpit.",note:null},
      {name:"Tongue Circles",sets:"2",reps:"20 circles",rest:"15 sec",instruction:"Tongue traces inside lips. Both directions.",note:null},
    ]},
  { day:"Sun",tag:"REST",emoji:"😴",color:"#4A72D4",type:"Full Rest — No Neck/Jaw Work",
    frequency:"Rest",
    focus:["Recovery","No Training"],
    exercises:[
      {name:"Rest Day",sets:"—",reps:"—",rest:"—",instruction:"No neck or jaw training today. 24-hr fast + full recovery is the protocol.",note:"Muscles grow during rest. Sunday is when the work from Mon–Sat consolidates."},
    ]},
];

const neckJawRules = [
  {icon:"⚠",color:"#C0392B",text:"NEVER do weighted neck work two days in a row — 48hr recovery minimum between strength days."},
  {icon:"⚠",color:"#C0392B",text:"NEVER train through sharp or shooting neck pain — stop immediately."},
  {icon:"💡",color:"#C9A84C",text:"Mewing is a 24/7 habit, not just during sets. Tongue on roof of mouth, lips sealed, breathing through nose constantly."},
  {icon:"💡",color:"#C9A84C",text:"Jaw exerciser progress is slow — expect 8–12 weeks to see visible masseter definition. Consistency beats intensity."},
  {icon:"💡",color:"#C9A84C",text:"Chin tucks throughout the day fix forward head posture — this alone makes the jawline appear sharper immediately."},
  {icon:"✅",color:"#27AE60",text:"Neck strength → thickness. Jaw exerciser → masseter definition. Mewing → structural. All three work differently — do all three."},
  {icon:"✅",color:"#27AE60",text:"Posture is the multiplier. Upright spine + chin tucks makes the neck look longer and the jaw sharper without any exercise."},
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
  const [activeSuppDay, setActiveSuppDay] = useState("Mon");
  const [activeNJDay, setActiveNJDay] = useState(0);
  const [groceryView, setGroceryView] = useState("list");

  const current = meals[day];
  const totals = calcDay(current);
  const tTot = calcDay(meals[T]);
  const rTot = calcDay(meals[R]);
  const sTot = calcDay(meals[S]);
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

  const laserBadge = (tag) => {
    if (!tag.includes("LASER")) return null;
    return (
      <div style={{ display:"inline-flex", flexDirection:"column", padding:"5px 10px", background:"#1A0A0A", border:"1px solid #FF4D4D30", borderRadius:7, marginLeft:8 }}>
        <span style={{ fontSize:8, color:"#FF6B6B", fontFamily:"monospace", letterSpacing:"0.14em", fontWeight:700 }}>iRESTORE</span>
        <span style={{ fontSize:8, color:"#FF6B6B99", fontFamily:"monospace" }}>25 min LLLT</span>
      </div>
    );
  };

  return (
    <div style={{ minHeight:"100vh", background:"#07080A", color:"#EAE8E2", fontFamily:"Palatino Linotype, Palatino, serif", overflowX:"hidden" }}>

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
              {[{id:T,l:"🏋️  Training"},{id:R,l:"😴  Rest"},{id:S,l:"⚡  Sunday Fast"}].map(d=>(
                <button key={d.id} onClick={()=>{setDay(d.id);setOpenMeal(null);}} style={{ padding:"7px 15px", background:day===d.id?d.id===S?"#6B4FBB":"#3A8F5C":"transparent", border:"none", color:day===d.id?"#07080A":"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", letterSpacing:"0.07em", transition:"all 0.2s", fontWeight:day===d.id?700:400, borderRight:d.id!==S?"1px solid #1A1C1E":"none" }}>{d.l}</button>
              ))}
            </div>
            <button onClick={()=>setTab("hair")} style={{ padding:"7px 15px", background:tab==="hair"?"#C9A84C18":"#0E0F11", border:`1px solid ${tab==="hair"?"#C9A84C50":"#1A1C1E"}`, borderRadius:6, color:tab==="hair"?"#C9A84C":"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", letterSpacing:"0.07em", transition:"all 0.2s" }}>💈  Hair</button>
            <button onClick={()=>setTab("skin")} style={{ padding:"7px 15px", background:tab==="skin"?"#E8B4D018":"#0E0F11", border:`1px solid ${tab==="skin"?"#E8B4D050":"#1A1C1E"}`, borderRadius:6, color:tab==="skin"?"#E8B4D0":"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", letterSpacing:"0.07em", transition:"all 0.2s" }}>✨  Skin</button>
            <button onClick={()=>setTab("face")} style={{ padding:"7px 15px", background:tab==="face"?"#4A72D418":"#0E0F11", border:`1px solid ${tab==="face"?"#4A72D450":"#1A1C1E"}`, borderRadius:6, color:tab==="face"?"#4A72D4":"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", letterSpacing:"0.07em", transition:"all 0.2s" }}>🗿  Face</button>
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
          {[["schedule","Schedule"],["workout","Workout"],["meals","Meals"],["supplements","Supps"],["macros","Macros"],["grocery","Grocery"]].map(([id,lbl])=>{
            const ac = "#3A8F5C";
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
                {t:"4:00 AM",icon:"🙏",l:"Wake · Prayer · Pre-Training",c:"#6B4FBB",b:"B12 sublingual. Vitality (2 caps). Beet Root + Maca. Pre-Workout. Hair: Rogaine to scalp (skip Wed/Sun), Copenhagen Activator 10 min later."},
                {t:"4:30 AM",icon:"🏋️",l:"Do or Die Circuit",c:"#B84040",b:"100-rep sets across 27 movements + push-up ladder."},
                {t:"5:30 AM",icon:"💪",l:"Main Session",c:"#B84040",b:"Mon: Strength · Tue: Power · Wed: Conditioning · Thu: Hypertrophy · Fri: Posterior · Sat: Operator · Sun: Recovery."},
                {t:"8:00 AM",icon:"🍵",l:"Green Tea + L-Theanine · Skin AM Begins",c:"#C8943A",b:"SA Cleanser → Vit C → HA → Alpha Arbutin → Cetaphil → SPF 70. Green Tea + L-Theanine."},
                {t:"9:00 AM",icon:"🍳",l:"Break Fast — Meal 1 + Morning Supps",c:"#3A8F5C",b:"Eggs + whey + oats + banana. D3/K2 softgels. Anabolic window open."},
                {t:"12:00 PM",icon:"🥬",l:"Meal 2 — Performance Lunch + Supergreens",c:"#3A8F5C",b:"Chicken + rice + kale + broccoli + avocado + sauerkraut. Zena Greens in water."},
                {t:"2:30 PM",icon:"🍓",l:"Meal 3 — Fruit + Protein Snack",c:"#B84040",b:"Greek yogurt + mango + kiwi + pomegranate."},
                {t:"4:30 PM",icon:"🌿",l:"Meal 4 — Last Meal by 5 PM",c:"#6B4FBB",b:"Salmon + sweet potato + asparagus + turmeric."},
                {t:"5:00 PM",icon:"🔒",l:"Eating Window Closes · Sun Fast Begins",c:"#1E2022",b:"16-hr fast begins. Water + green tea only."},
                {t:"SUN 5 PM",icon:"🌿",l:"Sunday Only — Autophagy Refeed Meal",c:"#6B4FBB",b:"Break 24-hr fast. Bone broth first. Salmon + veg. No starches. All supps with meal."},
                {t:"7:00 PM",icon:"🪡",l:"Derma Roll (Wed & Sun only)",c:"#C9A84C",b:"Sanitize → Roll → The Ordinary → Root Revive → Pumpkin Seed → Jojoba → Bonnet."},
                {t:"7:30 PM",icon:"🌙",l:"Skin PM + Hair Evening Stack",c:"#4A72D4",b:"Skin PM routine + Hair nightly stack."},
                {t:"8:30 PM",icon:"🌙",label:"Pre-Sleep Recovery Stack",c:"#4A72D4",b:"Growth Powder + Magnesium Bisglycinate."},
                {t:"9:30 PM",icon:"😴",l:"Sleep — Lights Out",c:"#4A72D4",b:"7 hours minimum. Every rep and growth phase happens here."},
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

                {/* Sunday: mobility phases */}
                {wDay.mobilityPhases ? (
                  <div style={{ marginBottom:14 }}>
                    <div style={{ fontSize:9, color:wDay.color, letterSpacing:"0.16em", fontFamily:"monospace", marginBottom:4 }}>30-MIN MOBILITY PROTOCOL</div>
                    <div style={{ padding:"8px 12px", background:"#0A1E12", border:"1px solid #3A8F5C25", borderRadius:8, marginBottom:14, fontSize:11, color:"#3A6A4C" }}>Move through each phase in order with no rest between phases. Go at your own pace. Focus on breath and end-range control — not speed.</div>
                    {wDay.mobilityPhases.map((ph,pi)=>(
                      <div key={pi} style={{ marginBottom:12, border:`1px solid ${ph.color}25`, borderRadius:12, overflow:"hidden" }}>
                        <div style={{ padding:"10px 14px", background:ph.color+"10", borderBottom:`1px solid ${ph.color}18`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                          <div>
                            <span style={{ fontSize:8, color:ph.color, fontFamily:"monospace", letterSpacing:"0.16em" }}>{ph.phase}  </span>
                            <span style={{ fontSize:13, color:"#EAE8E2" }}>{ph.emoji} {ph.label}</span>
                          </div>
                          <span style={{ fontSize:9, color:ph.color, fontFamily:"monospace", padding:"2px 8px", background:ph.color+"15", borderRadius:20 }}>{ph.duration}</span>
                        </div>
                        <div style={{ padding:"12px 14px" }}>
                          {ph.movements.map((mv,mi)=>(
                            <div key={mi} style={{ marginBottom:10, paddingBottom:10, borderBottom:mi<ph.movements.length-1?"1px solid #0D0E10":"none" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4, flexWrap:"wrap", gap:6 }}>
                                <div style={{ fontSize:12, color:"#C8C6C0", fontWeight:600 }}>{mv.name}</div>
                                <div style={{ display:"flex", gap:8 }}>
                                  <span style={{ fontSize:9, color:ph.color, fontFamily:"monospace" }}>{mv.sets} sets</span>
                                  <span style={{ fontSize:9, color:"#C8943A", fontFamily:"monospace" }}>{mv.reps}</span>
                                </div>
                              </div>
                              <div style={{ fontSize:9, color:"#3A6A4C", fontFamily:"monospace", marginBottom:4 }}>{mv.focus}</div>
                              <div style={{ fontSize:11, color:"#404244", lineHeight:1.65, marginBottom:mv.note?4:0 }}>{mv.instruction}</div>
                              {mv.note && <div style={{ fontSize:10, color:"#4A72D4", fontStyle:"italic" }}>{mv.note}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop:4 }}>
                      <div style={{ fontSize:9, color:wDay.color, letterSpacing:"0.16em", fontFamily:"monospace", marginBottom:9 }}>ADDITIONAL RECOVERY WORK</div>
                      <div style={{ overflowX:"auto" }}>
                        <table style={{ width:"100%", borderCollapse:"collapse", minWidth:400 }}>
                          <thead><tr style={{ borderBottom:"1px solid #141516" }}>{["Movement","Sets","Duration","Rest","Focus"].map(h=><th key={h} style={{ padding:"6px 7px", textAlign:"left", fontSize:8, color:"#242628", fontFamily:"monospace", letterSpacing:"0.1em", fontWeight:400 }}>{h}</th>)}</tr></thead>
                          <tbody>{wDay.exercises.filter(ex=>!ex.name.startsWith("Phase")).map((ex,i)=>(
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
                  </div>
                ) : (
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
                )}
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
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:9, marginBottom:18 }}>
              {[{id:T,l:"Training",d:tTot,c:"#3A8F5C"},{id:R,l:"Rest Day",d:rTot,c:"#4A72D4"},{id:S,l:"Sunday Fast",d:sTot,c:"#6B4FBB"}].map(x=>(
                <div key={x.id} onClick={()=>{setDay(x.id);setOpenMeal(null);}} style={{ padding:"13px 15px", borderRadius:10, cursor:"pointer", background:day===x.id?x.c+"10":"#0B0C0E", border:`1px solid ${day===x.id?x.c+"35":"#161719"}`, transition:"all 0.2s" }}>
                  <div style={{ fontSize:8, color:day===x.id?x.c:"#282A2C", fontFamily:"monospace", letterSpacing:"0.12em", marginBottom:4 }}>{x.l.toUpperCase()}</div>
                  <div style={{ fontSize:18, color:"#EAE8E2", marginBottom:2 }}>{x.d.cal.toLocaleString()} <span style={{ fontSize:9, color:"#303234" }}>kcal</span></div>
                  <div style={{ fontSize:9, color:"#303234", fontFamily:"monospace" }}>{x.d.p}g P · {x.d.c}g C · {x.d.f}g F</div>
                </div>
              ))}
            </div>
            {day===S && (
              <div style={{ padding:"12px 16px", background:"#0D0A1A", border:"1px solid #6B4FBB30", borderRadius:10, marginBottom:14 }}>
                <div style={{ fontSize:9, color:"#6B4FBB", fontFamily:"monospace", letterSpacing:"0.16em", marginBottom:6 }}>⚡ 24-HOUR AUTOPHAGY FAST — SAT 5 PM → SUN 5 PM</div>
                <div style={{ fontSize:11, color:"#4A4C4E", lineHeight:1.75 }}>
                  Water + green tea + electrolytes only until 5 PM.<br/>
                  All food-dependent supps shift to the 5 PM meal.<br/>
                  B12 sublingual at 4 AM is fine — does not break the fast.<br/>
                  Hair + skin routines as normal.
                </div>
              </div>
            )}
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
            <div style={{ fontSize:9, color:"#3A8F5C", letterSpacing:"0.22em", fontFamily:"monospace", marginBottom:14 }}>SUPPLEMENT PROTOCOL — BY DAY</div>
            {/* Day selector */}
            <div style={{ display:"flex", gap:6, marginBottom:20, flexWrap:"wrap" }}>
              {suppDays.map(d => {
                const isSunday = d === "Sun";
                const color = isSunday ? "#6B4FBB" : "#3A8F5C";
                const isActive = activeSuppDay === d;
                return (
                  <button key={d} onClick={()=>setActiveSuppDay(d)} style={{ padding:"8px 12px", borderRadius:8, border:`1px solid ${isActive?color+"60":"#161719"}`, background:isActive?color+"14":"#0B0C0E", color:isActive?color:"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", transition:"all 0.2s" }}>
                    <div style={{ fontSize:8, opacity:0.7, marginBottom:2 }}>{d.toUpperCase()}</div>
                    <div style={{ fontSize:9 }}>{isSunday?"⚡ FAST":"💊 STACK"}</div>
                  </button>
                );
              })}
            </div>
            {/* Legend */}
            <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
              {[{color:"#3A8F5C",bg:"#0A1E12",label:"Standard Stack",sub:"Mon–Sat"},{color:"#6B4FBB",bg:"#0D0A1A",label:"24-Hr Fast",sub:"Sunday only"}].map(l=>(
                <div key={l.label} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 10px", background:l.bg, border:`1px solid ${l.color}25`, borderRadius:6 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:l.color }} />
                  <div>
                    <div style={{ fontSize:8, color:l.color, fontFamily:"monospace", letterSpacing:"0.1em" }}>{l.label}</div>
                    <div style={{ fontSize:8, color:l.color+"60" }}>{l.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Day stack */}
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", left:17, top:8, bottom:8, width:1, background:"linear-gradient(to bottom,#FF6B6B30,#6B4FBB40,#B8404040,#C8943A40,#3A8F5C40,#4A72D440)" }} />
              {suppByDay[activeSuppDay].map((block,i)=>{
                const isDark = block.color==="#1E2022";
                return (
                  <div key={i} style={{ display:"flex", gap:13, marginBottom:4, position:"relative" }}>
                    <div style={{ width:34, height:34, borderRadius:"50%", flexShrink:0, background:isDark?"#101214":block.color+"14", border:`1px solid ${isDark?"#1A1C1E":block.color+"28"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, zIndex:1 }}>{block.icon}</div>
                    <div style={{ flex:1, padding:"10px 13px", marginBottom:4, background:"#0B0C0E", border:`1px solid ${isDark?"#131416":block.color+"18"}`, borderRadius:9 }}>
                      <div style={{ display:"flex", gap:9, alignItems:"baseline", marginBottom:7, flexWrap:"wrap" }}>
                        <span style={{ fontSize:11, color:isDark?"#282A2C":block.color, fontFamily:"monospace", fontWeight:700 }}>{block.time}</span>
                        <span style={{ fontSize:11, color:"#5A5C5E" }}>{block.label}</span>
                      </div>
                      {block.supps.map((s,j)=>(
                        <div key={j} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:6, paddingBottom:6, borderBottom:j<block.supps.length-1?"1px solid #0D0E10":"none" }}>
                          <div style={{ width:4, height:4, borderRadius:"50%", background:isDark?"#282A2C":block.color, flexShrink:0, marginTop:4 }} />
                          <div>
                            <div style={{ fontSize:11, color:"#A8A6A0", marginBottom:1 }}>{s.name}</div>
                            <div style={{ fontSize:10, color:"#2C2E30" }}>{s.note}</div>
                          </div>
                        </div>
                      ))}
                      {block.warning && <div style={{ marginTop:5, padding:"6px 9px", background:"#C8943A0E", border:"1px solid #C8943A20", borderRadius:6, fontSize:10, color:"#6A5228" }}>{block.warning}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── MACROS ── */}
        {tab==="macros" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:9, marginBottom:18 }}>
              {[{l:"Training Day",d:tTot,c:"#3A8F5C"},{l:"Rest Day",d:rTot,c:"#4A72D4"},{l:"Sunday Fast",d:sTot,c:"#6B4FBB"}].map(({l,d,c})=>(
                <div key={l} style={{ padding:"15px", background:"#0B0C0E", border:`1px solid ${c}18`, borderRadius:12 }}>
                  <div style={{ fontSize:8, color:c, fontFamily:"monospace", letterSpacing:"0.12em", marginBottom:7 }}>{l.toUpperCase()}</div>
                  <div style={{ fontSize:20, color:"#EAE8E2", marginBottom:11 }}>{d.cal.toLocaleString()} <span style={{ fontSize:9, color:"#2C2E30" }}>kcal</span></div>
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
            <div style={{ padding:"10px 14px", background:"#0D0A1A", border:"1px solid #6B4FBB25", borderRadius:9, fontSize:11, color:"#4A4C4E", lineHeight:1.7 }}>
              <span style={{ color:"#6B4FBB", fontFamily:"monospace", fontSize:8, letterSpacing:"0.14em" }}>⚡ SUNDAY FAST NOTE  </span>
              Single meal at 5 PM breaks a 24-hr fast. No starches — autophagy is carb-sensitive. All supplements taken with this meal.
            </div>
          </div>
        )}

        {/* ── GROCERY ── */}
        {tab==="grocery" && (
          <div>
            {/* Internal sub-tabs */}
            <div style={{ display:"inline-flex", border:"1px solid #1A1C1E", borderRadius:7, overflow:"hidden", marginBottom:18 }}>
              {[{id:"list",l:"🛒  Grocery List"},{id:"swaps",l:"🔄  Swaps"}].map(v=>(
                <button key={v.id} onClick={()=>setGroceryView(v.id)} style={{ padding:"8px 18px", background:groceryView===v.id?"#3A8F5C":"transparent", border:"none", color:groceryView===v.id?"#07080A":"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", letterSpacing:"0.07em", transition:"all 0.2s", fontWeight:groceryView===v.id?700:400, borderRight:v.id==="list"?"1px solid #1A1C1E":"none" }}>{v.l}</button>
              ))}
            </div>
            {groceryView==="list" && (
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
            {groceryView==="swaps" && (
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
          </div>
        )}

        {/* ── HAIR ── */}
        {tab==="hair" && (
          <div>
            <div style={{ fontSize:9, color:"#C9A84C", letterSpacing:"0.22em", fontFamily:"monospace", marginBottom:5 }}>HAIR GROWTH & CARE PROTOCOL</div>
            <p style={{ fontSize:11, color:"#343638", marginBottom:10, lineHeight:1.7 }}>4c hair · Growth + Density + Scalp Health · Wash 2×/week · Derma Roll: Wed & Sun PM</p>
            {/* Wash day + laser legend */}
            <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", background:"#1A0A0A", border:"1px solid #FF4D4D30", borderRadius:7 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:"#FF6B6B" }} />
                <div>
                  <div style={{ fontSize:9, color:"#FF6B6B", fontFamily:"monospace", letterSpacing:"0.1em" }}>MON / THU / SAT — iRESTORE</div>
                  <div style={{ fontSize:9, color:"#3A2020" }}>25 min LLLT · Before Rogaine · Alternating days only</div>
                </div>
              </div>
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
                  {laserBadge(hDay.tag)}
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
              Vit C + Niacinamide never together · Retinol + Glycolic never same night · Faded Serum + AHAs/BHAs/Retinol never same session · Aztec mask = no other actives
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

        {/* ── FACE ── */}
        {tab==="face" && (
          <div>
            <div style={{ fontSize:9, color:"#4A72D4", letterSpacing:"0.22em", fontFamily:"monospace", marginBottom:5 }}>NECK · JAW · FACE PROTOCOL</div>
            <p style={{ fontSize:11, color:"#343638", marginBottom:14, lineHeight:1.7 }}>Thick neck · Sharp jaw · Defined cheekbones · Aesthetic face structure · Home protocol</p>
            {/* Weekly split legend */}
            <div style={{ display:"flex", gap:7, marginBottom:16, flexWrap:"wrap" }}>
              {[{color:"#B84040",bg:"#1A0A0A",label:"NECK STRENGTH",sub:"Mon + Thu · 10lb weighted"},{color:"#C8943A",bg:"#1A120A",label:"JAW + FACE",sub:"Tue + Fri · Exerciser + resistance"},{color:"#3A8F5C",bg:"#0A1E12",label:"MOBILITY",sub:"Wed + Sat · Stretch + decompress"},{color:"#4A72D4",bg:"#0A0D1A",label:"REST",sub:"Sunday"}].map(l=>(
                <div key={l.label} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 10px", background:l.bg, border:`1px solid ${l.color}25`, borderRadius:6 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:l.color }} />
                  <div>
                    <div style={{ fontSize:8, color:l.color, fontFamily:"monospace", letterSpacing:"0.1em" }}>{l.label}</div>
                    <div style={{ fontSize:8, color:l.color+"60" }}>{l.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Day selector */}
            <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap" }}>
              {neckJawDays.map((d,i)=>(
                <button key={i} onClick={()=>setActiveNJDay(i)} style={{ padding:"7px 12px", borderRadius:8, border:`1px solid ${activeNJDay===i?d.color+"50":"#161719"}`, background:activeNJDay===i?d.color+"14":"#0B0C0E", color:activeNJDay===i?d.color:"#343638", fontSize:11, cursor:"pointer", fontFamily:"monospace", transition:"all 0.2s" }}>
                  <div style={{ fontSize:8, opacity:0.7, marginBottom:1 }}>{d.day.toUpperCase()}</div>
                  <div style={{ fontSize:10 }}>{d.emoji} {d.tag}</div>
                </button>
              ))}
            </div>
            {/* Day card */}
            {(() => {
              const njDay = neckJawDays[activeNJDay];
              return (
                <div style={{ border:`1px solid ${njDay.color}30`, borderRadius:14, overflow:"hidden" }}>
                  <div style={{ padding:"16px 20px", background:njDay.color+"10", borderBottom:`1px solid ${njDay.color}18` }}>
                    <div style={{ fontSize:9, color:njDay.color, fontFamily:"monospace", letterSpacing:"0.2em", marginBottom:3 }}>{njDay.day.toUpperCase()} · {njDay.tag}</div>
                    <div style={{ fontSize:18, color:"#EAE8E2", marginBottom:4 }}>{njDay.emoji} {njDay.type}</div>
                    <div style={{ fontSize:9, color:njDay.color+"80", fontFamily:"monospace", marginBottom:8 }}>📅 {njDay.frequency}</div>
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>{njDay.focus.map(f=><span key={f} style={{ padding:"2px 8px", borderRadius:20, background:njDay.color+"12", border:`1px solid ${njDay.color}20`, fontSize:9, color:njDay.color, fontFamily:"monospace" }}>{f}</span>)}</div>
                  </div>
                  <div style={{ padding:"18px 20px" }}>
                    <div style={{ fontSize:8, color:njDay.color, fontFamily:"monospace", letterSpacing:"0.14em", marginBottom:10, paddingBottom:5, borderBottom:`1px solid ${njDay.color}20` }}>🌙 NIGHTTIME ROUTINE</div>
                    <div style={{ overflowX:"auto" }}>
                      <table style={{ width:"100%", borderCollapse:"collapse", minWidth:420 }}>
                        <thead><tr style={{ borderBottom:"1px solid #141516" }}>{["Exercise","Sets","Reps","Rest"].map(h=><th key={h} style={{ padding:"6px 7px", textAlign:"left", fontSize:8, color:"#242628", fontFamily:"monospace", letterSpacing:"0.1em", fontWeight:400 }}>{h}</th>)}</tr></thead>
                        <tbody>
                          {njDay.exercises.map((ex,i)=>(
                            <tr key={i} style={{ borderBottom:"1px solid #0D0E10" }}>
                              <td style={{ padding:"9px 7px" }}>
                                <div style={{ fontSize:11, color:"#C8C6C0", marginBottom:2 }}>{ex.name}</div>
                                <div style={{ fontSize:10, color:"#343638", lineHeight:1.6 }}>{ex.instruction}</div>
                                {ex.note && <div style={{ fontSize:9, color:"#4A72D4", marginTop:3, fontStyle:"italic" }}>{ex.note}</div>}
                              </td>
                              <td style={{ padding:"9px 7px", fontSize:12, color:njDay.color, fontFamily:"monospace", textAlign:"center", verticalAlign:"top" }}>{ex.sets}</td>
                              <td style={{ padding:"9px 7px", fontSize:11, color:"#C8943A", fontFamily:"monospace", verticalAlign:"top", whiteSpace:"nowrap" }}>{ex.reps}</td>
                              <td style={{ padding:"9px 7px", fontSize:10, color:"#404244", fontFamily:"monospace", verticalAlign:"top", whiteSpace:"nowrap" }}>{ex.rest}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}
            <div style={{ marginTop:14 }}>
              <div style={{ fontSize:9, color:"#4A72D4", letterSpacing:"0.18em", fontFamily:"monospace", marginBottom:7 }}>GOLDEN RULES</div>
              {neckJawRules.map(ruleBox)}
            </div>
          </div>
        )}

      </div>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 3px; height: 3px; } ::-webkit-scrollbar-track { background: #07080A; } ::-webkit-scrollbar-thumb { background: #1A1C1E; border-radius: 2px; } button:focus { outline: none; }`}</style>
    </div>
  );
}
