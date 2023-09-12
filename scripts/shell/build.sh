#!/bin/bash

npx google-closure-compiler \
--language_in ECMASCRIPT6 \
--language_out ECMASCRIPT5_STRICT \
--warning_level DEFAULT \
--compilation_level SIMPLE \
--isolation_mode IIFE \
--js "./../../lib/rune.js" \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/data/resource/Requests.js" \
--js "./../../src/entity/Background.js" \
--js "./../../src/entity/Character.js" \
--js "./../../src/entity/Cloud_Dangerous.js" \
--js "./../../src/entity/Cloud_Neutral.js" \
--js "./../../src/entity/Candy.js" \
--js "./../../src/entity/ShellShield.js" \
--js "./../../src/entity/SleepyCloud.js" \
--js "./../../src/entity/Generator_StageOne.js" \
--js "./../../src/scene/menu/Menu.js" \
--js "./../../src/scene/game/Game.js" \
--js "./../../src/scene/game/Game_Over.js" \
--js "./../../src/scene/menu/HighScore.js" \
--js "./../../src/scene/menu/Instructions.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/scope/Alias.js" \
--js_output_file "./../../dist/cloud_hop.js";
