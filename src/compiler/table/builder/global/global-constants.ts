export enum Constants {
    // 0 Locations, positions, sequences
    LOCATION_DECK,                         // The Deck. If it is used as Location Redirect, the card is placed on the top. (decimal value= 1)
    LOCATION_HAND,                         // The hand  (decimal value= 2)
    LOCATION_MZONE,                        // The Monster Zone  (decimal value= 4)
    LOCATION_SZONE,                        // The Spell|Trap Zones. It includes the Field Spell Zone and the Pendulum Zones (&lt;=MR3). (decimal value= 8)
    LOCATION_GRAVE,                        // The graveyard|GY (decimal value= 16)
    LOCATION_REMOVED,                      // The area where banished card go (decimal value= 32)
    LOCATION_EXTRA,                        // The Extra Deck (decimal value= 64)
    LOCATION_OVERLAY,                      // The location for cards attached as Xyz Material. Also the location used for "stacked" cards  (for anime-only cards) (decimal value= 128)
    LOCATION_ONFIELD,                      // All locations on the field. The sum of LOCATION_MZONE+LOCATION_SZONE. (decimal value= 192 )
    LOCATION_PUBLIC,                       // Used for scripting purposes. The sum of locations (LOCATION_ONFIELD+LOCATION_REMOVED+LOCATION_GRAVE) where cards are, usually, public knowledge.
    LOCATION_ALL,                          // All possible locations. This is the sum of LOCATION_ONFIELD, LOCATION_DECK, LOCATION_HAND, LOCATION_GRAVE, LOCATION_REMOVED, LOCATION_EXTRA and LOCATION_OVERLAY
    LOCATION_DECKBOT,                      // The Bottom of Deck. Used only in Location Redirect
    LOCATION_DECKSHF,                      // Location for cards that are place in Deck and then the Deck is shuffled. Used only in Location Redirect
    LOCATION_FZONE,                        // The Field Spell zone
    LOCATION_PZONE,                        // The Pendulum Zone
    LOCATION_STZONE,                       // The Spell|Trap Zone (without the Field Zone). Symbolic location. Can be used in functions expecting a location and also in SetRange (except with trigger effects)
    LOCATION_MMZONE,                       // The Main Monster Zones. Symbolic location. Can be used in functions expecting a location and also in SetRange (except with trigger effects)
    LOCATION_EMZONE,                       // The Extra Monster Zones. Symbolic location. Can be used in functions expecting a location and also in SetRange (except with trigger effects)
    ZONES_MMZ,                             // Constant to be used as mask to filter for main monster zones
    ZONES_EMZ,                             // Constant to be used as mask to filter for extra monster zones
    SEQ_DECKTOP,                           // Sequence to be used with Duel.SendtoDeck. Sends the card to the top of the Deck
    SEQ_DECKBOTTOM,                        // Sequence to be used with Duel.SendtoDeck. Sends the card to the bottom of the Deck
    SEQ_DECKSHUFFLE,                       // Sequence to be used with Duel.SendtoDeck. Sends the card to the top of the Deck, then suffles it
    COIN_HEADS,                            // Value for coin results
    COIN_TAILS,                            // Value for coin results
    POS_FACEUP,                            // Face-up position, attack + defense if on field.  (decimal value= 5)
    POS_FACEDOWN,                          // Face-down position, attack + defense if on field  (decimal value= 10)
    POS_FACEUP_ATTACK,                     // Face-up attack position (decimal value= 1)
    POS_FACEDOWN_ATTACK,                   // Face-down attack position. Used with "Darkness Approaches" (Pre-Errata)
    POS_FACEUP_DEFENSE,                    // Face-up defense position (decimal value= 4)
    POS_FACEDOWN_DEFENSE,                  // Face-down defense position (decimal value= 8)
    POS_ATTACK,                            // Attack position, face-up + face-down (decimal value= 3)
    POS_DEFENSE,                           // Defense position, face-up + face-down  (decimal value= 12)
    NO_FLIP_EFFECT,                        // Applies position change without triggering FLIP effects
    
    // 1 Card types, attributes and monster type
    TYPE_MONSTER,                          // A Monster card  (decimal value= 1)
    TYPE_SPELL,                            // A Spell card  (decimal value= 2)
    TYPE_TRAP,                             // A Trap card (decimal value= 4)
    TYPE_NORMAL,                           // A Normal monster (decimal value= 16)
    TYPE_EFFECT,                           // A card with effect (decimal value= 32)
    TYPE_FUSION,                           // A Fusion (monster) (decimal value= 64)
    TYPE_RITUAL,                           // A Ritual card (decimal value= 128)
    TYPE_TRAPMONSTER,                      // A Trap monster, e.g. Embodiment of Apophis. NOTE: This is not used in addition to the default card types.  (decimal value= 256)
    TYPE_SPIRIT,                           // Spirit monster (decimal value= 512)
    TYPE_UNION,                            // Union monster (decimal value= 1024)
    TYPE_GEMINI,                           // A Gemini monster (decimal value= 2048)
    TYPE_TUNER,                            // Tuner (decimal value=4096)
    TYPE_SYNCHRO,                          // A Synchro (decimal value= 8192)
    TYPE_TOKEN,                            // A token  (decimal value= 16384)
    TYPE_MAXIMUM,                          // A Maximum Monster  (decimal value= 32768)
    TYPE_QUICKPLAY,                        // A Quick Play card  (decimal value= 65536)
    TYPE_CONTINUOUS,                       // A Continuous card (decimal value=131072 )
    TYPE_EQUIP,                            // An equip card (decimal value= 262144)
    TYPE_FIELD,                            // A field card (decimal value= 524288)
    TYPE_COUNTER,                          // A counter card, used for Counter Trap cards (decimal value=1048576 )
    TYPE_FLIP,                             // Flip (decimal value= 2097152)
    TYPE_TOON,                             // Toon (decimal value= 4194304)
    TYPE_XYZ,                              // An Xyz (decimal value= 8388608)
    TYPE_PENDULUM,                         // Pendulum (decimal value= 16777216)
    TYPE_SPSUMMON,                         // An Special Summon-only monster. Used for Nomi|Semi-Nomi Main Deck monsters (decimal value= 33554432)
    TYPE_LINK,                             // A Link (decimal value= 67108864)
    TYPE_SKILL,                            // A Skill Card. (decimal value= 134217728)
    TYPE_ACTION,                           // An Action card. (decimal value= 268435456)
    TYPES_TOKEN,                           // Constant used to simplify cards that summon tokens. Sum of the following values: Monster + Normal + Token (decimal value= 16401)
    TYPE_EXTRA,                            // And extra deck monster card that. This is the summon of TYPE_FUSION+TYPE_SYNCHRO+TYPE_XYZ+TYPE_LINK (decimal value= 75505728)
    TYPE_PLUS,                             // Plus Type, only usable if 419 is called
    TYPE_MINUS,                            // Minus Type, only usable if 419 is called
    TYPE_ARMOR,                            // Armor Type, only usable if 419 is called
    ATTRIBUTE_EARTH,                       // The EARTH attribute for monsters  (decimal value= 1)
    ATTRIBUTE_WATER,                       // The WATER attribute for monsters (decimal value= 2)
    ATTRIBUTE_FIRE,                        // The FIRE attribute for monsters (decimal value= 4)
    ATTRIBUTE_WIND,                        // The WIND attribute for monsters (decimal value= 8)
    ATTRIBUTE_LIGHT,                       // The LIGHT attribute for monsters (decimal value= 16)
    ATTRIBUTE_DARK,                        // The DARK attribute for monsters (decimal value= 32)
    ATTRIBUTE_DIVINE,                      // The DIVINE attribute for monsters (decimal value= 64)
    ATTRIBUTE_LAUGH,                       // The LAUGH attribute, only usable if the 419 script is called
    ATTRIBUTE_ALL,                         // The sum of all official monster attributes (including divine)
    RACE_ALL,                              // A constant that includes all monster types from Warrior to Illusionist
    RACE_WARRIOR,                          // Warrior type monster (decimal value= 1)
    RACE_SPELLCASTER,                      // Spellcaster type monster (decimal value= 2)
    RACE_FAIRY,                            // Fairy type monster (decimal value= 4)
    RACE_FIEND,                            // Fiend type monster (decimal value= 8)
    RACE_ZOMBIE,                           // Zombie type monster (decimal value= 16)
    RACE_MACHINE,                          // Machine type monster (decimal value= 32)
    RACE_AQUA,                             // Aqua type monster (decimal value=64 )
    RACE_PYRO,                             // Pyro type monster (decimal value=128 )
    RACE_ROCK,                             // Rock type monster (decimal value= 256)
    RACE_WINGEDBEAST,                      // Winged Beast type monster (decimal value= 512)
    RACE_PLANT,                            // Plant type monster (decimal value= 1024)
    RACE_INSECT,                           // Insect type monster (decimal value= 2048)
    RACE_THUNDER,                          // Thunder type monster (decimal value=4096)
    RACE_DRAGON,                           // Dragon type monster (decimal value= 8192)
    RACE_BEAST,                            // Beast type monster (decimal value= 16384)
    RACE_BEASTWARRIOR,                     // Beast-Warrior type monster (decimal value= 32768)
    RACE_DINOSAUR,                         // Dinosaur type monster (decimal value= 65536)
    RACE_FISH,                             // Fish type monster (decimal value= 131072)
    RACE_SEASERPENT,                       // Sea Serpent type monster (decimal value= 262144)
    RACE_REPTILE,                          // Reptile type monster (decimal value= 524288)
    RACE_PSYCHIC,                          // Psychic type monster (decimal value= 1048576)
    RACE_DIVINE,                           // Divine-Beast type monster (decimal value= 2097152)
    RACE_CREATORGOD,                       // Creator God type monster (decimal value= 4194304)
    RACE_WYRM,                             // The Wyrm monster type (decimal value= 8388608)
    RACE_CYBERSE,                          // The Cyberse monster type (decimal value= 16777216)
    RACE_ILLUSION,                         // The Illusion monster type (decimal value= 33554432)
    RACE_CYBORG,                           // Rush duel monster type (race)
    RACE_MAGICALKNIGHT,                    // Rush duel monster type (race)
    RACE_HIGHDRAGON,                       // Rush duel monster type (race)
    RACE_OMEGAPSYCHIC,                     // Rush duel monster type (race)
    RACE_CELESTIALWARRIOR,                 // Rush duel monster type (race)
    RACE_GALAXY,                           // Rush duel monster type (race)
    RACE_YOKAI,                            // Yokai type monster, only usable if token 419 is called.
    RACES_BEAST_BWARRIOR_WINGB,            // Union of Beast, Beast-Warrior and Winged Beast types, for the many cards that support all 3 at once.
    
    // 2 Reasons, summon types, status and assume values
    REASON_DESTROY,                        // The card being destroyed (decimal value= 1)
    REASON_RELEASE,                        // The card being tributed (decimal value= 2)
    REASON_TEMPORARY,                      // The card being  temporary banished (decimal value= 4)
    REASON_MATERIAL,                       // Used as Fusion/Synchro/Xyz/Link material, etc. (decimal value= 8)
    REASON_SUMMON,                         // Used for a summon (decimal value= 16)
    REASON_BATTLE,                         // The card being destroyed by battle (decimal value= 32)
    REASON_EFFECT,                         // The reason that causes the event is a card effect (decimal value= 64)
    REASON_COST,                           // The reason used for costs. It is also the same used to destroy/send to the GY cards that fail to pay their maintenance costs (decimal value= 128)
    REASON_ADJUST,                         // Adjustment (Royal before the test) (decimal value= 256)
    REASON_LOST_TARGET,                    // Equip Target stops being face-up, either by leaving the field or being flipped face-down (decimal value= 512)
    REASON_RULE,                           // The value used for reasons associated with game mechanics (decimal value= 1024)
    REASON_SPSUMMON,                       // The reason for the event is an Special Summon (decimal value= 2048)
    REASON_DISSUMMON,                      // The reason for the event is a Summon being negated (dissummon= disabled summon) (decimal value= 4096)
    REASON_FLIP,                           // Being flipped (decimal value= 8192)
    REASON_DISCARD,                        // The reason for the even is a card being discarded (decimal value= 16384)
    REASON_RDAMAGE,                        // Reversal Damage: gain LP becomes damage - used only in the core
    REASON_RRECOVER,                       // Reversal Recovery: damage becomes gain LP - used only in the core
    REASON_RETURN,                         // Return from banished to Graveyard (decimal value= 131072)
    REASON_FUSION,                         // Used for Fusion Summon (decimal value= 262144)
    REASON_SYNCHRO,                        // Used for Synchro Summon (decimal value= 524288)
    REASON_RITUAL,                         // Used for Ritual Summon (decimal value= 1048576)
    REASON_XYZ,                            // Used for Xyz Summon (decimal value= 2097152)
    REASON_REPLACE,                        // Event is happening because of an effect that states "If X would be destroyed, do this instead." (decimal value= 4194304)
    REASON_DRAW,                           // Event is a card being drawn (decimal value= 8388608)
    REASON_REDIRECT,                       // Sent to a location other than intended, eg "Banish this card if it leaves the field." (decimal value= 16777216)
    REASON_REVEAL,                         // Used by cards that require being sent to the GY after being excavated. See "Sylvan" monsters
    REASON_LINK,                           // Used for Link Summon (decimal value= 67108864)
    LOCATION_REASON_TOFIELD,               // Default reason for Duel.GetLocationCount(), counts for Kaiser Colosseum
    LOCATION_REASON_CONTROL,               // Used by Card.IsControlerCanBeChanged()
    LOCATION_REASON_COUNT,                 // Duel.GetLocationCount() for DisableField
    SUMMON_TYPE_NORMAL,                    // Normal summoned (EFFECT_SUMMON_PROC, EFFECT_SET_PROC can use SetValue to modify the value)
    SUMMON_TYPE_ADVANCE,                   // Tribute Summon, an specific type of Normal Summon.
    SUMMON_TYPE_GEMINI,                    // Normal Summoned Gemini Monster.
    SUMMON_TYPE_FLIP,                      // Flip Summon
    SUMMON_TYPE_SPECIAL,                   // Special summon (EFFECT_SPSUMMON_PROC, EFFECT_SPSUMMON_PROC_G can use SetValue to modify the value)
    SUMMON_TYPE_FUSION,                    // Fusion Summon
    SUMMON_TYPE_RITUAL,                    // Ritual Summon
    SUMMON_TYPE_SYNCHRO,                   // Synchro Summon
    SUMMON_TYPE_XYZ,                       // Xyz Summon
    SUMMON_TYPE_PENDULUM,                  // Pendulum Summon
    SUMMON_TYPE_LINK,                      // Link Summon
    SUMMON_TYPE_MAXIMUM,                   // Maximum Summon (Rush duel summon type)
    STATUS_DISABLED,                       // Effect is negated
    STATUS_TO_ENABLE,                      // Effect negation would be removed
    STATUS_TO_DISABLE,                     // Effect would be negated
    STATUS_PROC_COMPLETE,                  // The card has been summoned properly  (usually by its own condition)
    STATUS_SET_TURN,                       // Spell/Traps set this turn
    STATUS_NO_LEVEL,                       // The card is treated as having Level/Rank/Link 0
    STATUS_BATTLE_RESULT,                  // Destroyed by battle at the end of damage calculation
    STATUS_SPSUMMON_STEP,                  // Special Summon not yet finished aka "Step"
    STATUS_FORM_CHANGED,                   // A monster that had his position manually changed in the current turn
    STATUS_SUMMONING,                      // The timing for when a monster "Would be Summoned"
    STATUS_EFFECT_ENABLED,                 // Usable card on field (has activated, already Summoned, effects applied)
    STATUS_SUMMON_TURN,                    // The monster was Normal Summoned/Set in the current turn
    STATUS_DESTROY_CONFIRMED,              // The card is going to be destroyed
    STATUS_LEAVE_CONFIRMED,                // After the chain resolves, an activated card with this status would immediately go to Graveyard
    STATUS_BATTLE_DESTROYED,               // Already destroyed by battle (during battle)
    STATUS_COPYING_EFFECT,                 // A card with this status is copying the effect of another card
    STATUS_CHAINING,                       // A card wiith this status has one of its effects on the current Chain
    STATUS_SUMMON_DISABLED,                // A monster which had its summon negated
    STATUS_ACTIVATE_DISABLED,              // A card that had its activation negated
    STATUS_EFFECT_REPLACED,                // A card affected by ReplaceEffect
    STATUS_FUTURE_FUSION,                  // Future Materials wouldn't trigger after Fusion Monster is Summoned
    STATUS_ATTACK_CANCELED,                // Attack was negated
    STATUS_INITIALIZING,                   // Cards which are at "initial_effect" state
    STATUS_JUST_POS,                       // A monster that had just changed its position
    STATUS_CONTINUOUS_POS,                 // Set again after changing to other positions
    STATUS_FORBIDDEN,                      // A card that cannot be used (for example, if it was declared by Prohibition or Psi-Blocker)
    STATUS_ACT_FROM_HAND,                  // A card with this sattus can be activated from hand
    STATUS_OPPO_BATTLE,                    // Has destroyed an opponent's monster by battle
    STATUS_FLIP_SUMMON_TURN,               // A card with this status was Flip Summoned in the current turn
    STATUS_SPSUMMON_TURN,                  // A card with this status was Special Summoned in the current turn
    ASSUME_CODE,                           // Temporarily assumes that the affected card has a given code (ID/name)
    ASSUME_TYPE,                           // Temporarily assumes that the affected card has a given Type
    ASSUME_LEVEL,                          // Temporarily assumes that the affected card has a given level
    ASSUME_RANK,                           // Temporarily assumes that the affected card has a given rank
    ASSUME_ATTRIBUTE,                      // Temporarily assumes that the affected card has a given attribute
    ASSUME_RACE,                           // Temporarily assumes that the affected card has a given race
    ASSUME_ATTACK,                         // Temporarily assumes that the affected card has a given ATK
    ASSUME_DEFENSE,                        // Temporarily assumes that the affected card has a given DEF
    ASSUME_LINK,                           // Temporarily assumes that the affected card has a given Link Rating
    ASSUME_LINKMARKER,                     // Temporarily assumes that the affected card has given Link Markers
    
    // 3 link markers, counter permissions, phases and players
    LINK_MARKER_BOTTOM_LEFT,               // Has this link arrow: ↙
    LINK_MARKER_BOTTOM,                    // Has this link arrow: ⬇
    LINK_MARKER_BOTTOM_RIGHT,              // Has this link arrow: ↘
    LINK_MARKER_LEFT,                      // Has this link arrow: ⬅
    LINK_MARKER_RIGHT,                     // Has this link arrow: ➡
    LINK_MARKER_TOP_LEFT,                  // Has this link arrow: ↖
    LINK_MARKER_TOP,                       // Has this link arrow: ⬆
    LINK_MARKER_TOP_RIGHT,                 // Has this link arrow: ↗
    COUNTER_WITHOUT_PERMIT,                // Added to counter value to allow counters for any card (does not require Card.EnableCounterPermit)
    COUNTER_NEED_ENABLE,                   // Added to counter value to require target to require its effects not negated
    PHASE_DRAW,                            // The Draw Phase of a player (decimal value= 1)
    PHASE_STANDBY,                         // The Standby Phase (decimal value= 2)
    PHASE_MAIN1,                           // The Main Phase 1 (decimal value= 4)
    PHASE_BATTLE_START,                    // The Start Step, first step of the Battle Phase (decimal value= 8)
    PHASE_BATTLE_STEP,                     // The Battle Step (decimal value= 16)
    PHASE_DAMAGE,                          // The Damage Step (decimal value= 32)
    PHASE_DAMAGE_CAL,                      // The Damage Calculation (decimal value= 64)
    PHASE_BATTLE,                          // Battle Phase/End of Battle Phase (decimal value= 128)
    PHASE_MAIN2,                           // The Main Phase 2 (decimal value= 256)
    PHASE_END,                             // The End Phase of a turn (decimal value= 512)
    PLAYER_NONE,                           // No player
    PLAYER_ALL,                            // Both players
    PLAYER_EITHER,                         // Any player
    
    // 4 Chaininfo
    CHAININFO_CHAIN_COUNT,                 // Chain Link Number
    CHAININFO_TRIGGERING_EFFECT,           // The effect that triggered the current Chain Link
    CHAININFO_TRIGGERING_PLAYER,           // The player that triggered the current Chain Link
    CHAININFO_TRIGGERING_CONTROLER,        // The controller of the card that triggered the current Chain Link
    CHAININFO_TRIGGERING_LOCATION,         // The location of the card that triggered the current Chain Link
    CHAININFO_TRIGGERING_LOCATION_SYMBOLIC, //
    CHAININFO_TRIGGERING_SEQUENCE,         // The sequence (zone within a location) that triggered the current Chain Link
    CHAININFO_TRIGGERING_SEQUENCE_SYMBOLIC, //
    CHAININFO_TARGET_CARDS,                // Cards targeted by the effect of the current Chain Link
    CHAININFO_TARGET_PLAYER,               // Player targeted by the effect of the current Chain Link
    CHAININFO_TARGET_PARAM,                // Get Value set in Duel.SetTargetParam()
    CHAININFO_DISABLE_REASON,              // The reason that disabled the effect/card/summon
    CHAININFO_DISABLE_PLAYER,              // The player that disabled the effect/card/summon
    CHAININFO_CHAIN_ID,                    // Chain ID
    CHAININFO_TYPE,                        // Chain type
    CHAININFO_EXTTYPE,                     // Chain extra type
    CHAININFO_TRIGGERING_POSITION,         // The position of the card that triggered the current Chain Link
    CHAININFO_TRIGGERING_CODE,             // The id of the card that triggered the current Chain Link
    CHAININFO_TRIGGERING_CODE2,            //
    CHAININFO_TRIGGERING_LEVEL,            // The level of the card that triggered the current Chain Link
    CHAININFO_TRIGGERING_RANK,             // The rank of the card that triggered the current Chain Link
    CHAININFO_TRIGGERING_ATTRIBUTE,        // The attribute of the card that triggered the current Chain Link
    CHAININFO_TRIGGERING_RACE,             // The type (warrior, zombie, etc) of the card that triggered the current Chain Link
    CHAININFO_TRIGGERING_ATTACK,           // The attack of the card that triggered the current Chain Link
    CHAININFO_TRIGGERING_DEFENSE,          // The defense of the card that triggered the current Chain Link
    
    // 5 Reset values
    RESET_EVENT,                           // Reset when a given event occurs (add the event value)
    RESET_CARD,                            // Reset Owner to specify the effect of the card
    RESET_CODE,                            // Reset the single effect of the specified Code (excluding EFFECT_FLAG_SINGLE_RANGE)
    RESET_COPY,                            // Reset to copy the effect achieved
    RESET_DISABLE,                         // Reset when the card's effect is negated
    RESET_TURN_SET,                        // Reset when turned face-down ("Set")
    RESET_TOGRAVE,                         // Reset when the card goes to the graveyard
    RESET_REMOVE,                          // Reset when the card is banished
    RESET_TEMP_REMOVE,                     // Reset when the card is temporarily banished
    RESET_TOHAND,                          // Reset when the card is sent to the hand
    RESET_TODECK,                          // Reset when the card is sent to the deck
    RESET_LEAVE,                           // Resets when the card leaves the field (the card moves to a different location from LOCATION_MZONE or LOCATION_SZONE)
    RESET_TOFIELD,                         // Reset when the card moves to the field (the card moves to LOCATION_MZONE or LOCATION_SZONE from a different location. Returning to the field is not included)
    RESET_CONTROL,                         // Reset when control of the card changes
    RESET_OVERLAY,                         // Reset when the card is used as Xyz Material
    RESET_MSCHANGE,                        // Reset when moving between the monster zones and spell/trap zones (MoveToField(), Crystal Beasts)
    RESET_SELF_TURN,                       // Reset on your turn
    RESET_OPPO_TURN,                       // Reset on the opponent's turn
    RESET_PHASE,                           // Resets at a given phase (add the phase value)
    RESET_CHAIN,                           // Reset at the end of the resolving Chain
    RESETS_STANDARD,                       // Complex reset. The sum of RESET_TURN_SET, TOGRAVE, REMOVE, TEMP_REMOVE, TOHAND, TODECK, LEAVE and TOFIELD, to be used with RESET_EVENT
    RESETS_STANDARD_DISABLE,               // Complex reset. The sum of RESETS_STANDARD+RESET_DISABLE, used with RESET_EVENT. Used for effects that need to reset when the monster's effects are negated (eg a monster changing its ATK/DEF or Level with its own effect).
    RESETS_REDIRECT,                       // Complex reset. The sum of RESETS_STANDARD+RESET_OVERLAY-RESET_TOFIELD-RESET_LEAVE, most often used for EFFECT_LEAVE_FIELD_REDIRECT resets
    RESETS_CANNOT_ACT,                     // Complex reset. The sum of RESETS_STANDARD-RESET_LEAVE, used in thing like ancient gear drill and troymare maybe.
    RESETS_STANDARD_EXC_GRAVE,             // Complex reset. The sum of  RESETS_STANDARD-RESET_TOGRAVE-RESET_LEAVE, mainly used for card that negate effect of card they destroy by battle.
    
    // 6 Effect types and effect flags
    EFFECT_TYPE_SINGLE,                    // An effect that applies only to itself. When used with trigger effects, this makes the card look for the event only when it happens to itself.
    EFFECT_TYPE_FIELD,                     // An effect that applies to the whole field.When used with trigger effects, this makes the effect look for the event when it happens to anything
    EFFECT_TYPE_EQUIP,                     // An effect that applies when the card is an Equip card.
    EFFECT_TYPE_ACTIONS,                   // Effects that trigger. (Added to effects automatically)
    EFFECT_TYPE_ACTIVATE,                  // Spell/Trap Activation
    EFFECT_TYPE_FLIP,                      // Trigger effect that adds EFFECT_TYPE_TRIGGER_F to SetType and EVENT_FLIP to SetCode by default
    EFFECT_TYPE_IGNITION,                  // An effect that the turn player chooses to apply during their Main Phase, in a open game state. It is Speed Spell 1
    EFFECT_TYPE_TRIGGER_O,                 // Optional Trigger effect
    EFFECT_TYPE_QUICK_O,                   // Optional Quick effect
    EFFECT_TYPE_TRIGGER_F,                 // Mandatory Trigger effect
    EFFECT_TYPE_QUICK_F,                   // Mandatory Quick Effect (such as Light and Darkness Dragon)
    EFFECT_TYPE_CONTINUOUS,                // Auxiliary effect / persistent effect triggered by an event
    EFFECT_TYPE_XMATERIAL,                 // Applies an effect to a monster that has this card as Xyz Material (see "Zoodiac" cards)
    EFFECT_TYPE_GRANT,                     // Provides an effect to other cards (see "The Weather" cards)
    EFFECT_TYPE_TARGET,                    // Currently not used by any cards. Evaluated by the core in the following functions: effect::is_target, effect::is_available, card::add_effect and card::remove_effect
    EFFECT_FLAG_INITIAL,                   // Original effect of a card (automatically applied)
    EFFECT_FLAG_FUNC_VALUE,                // The Value property of this effect is a function
    EFFECT_FLAG_COUNT_LIMIT,               // The number of times an effects can be triggered
    EFFECT_FLAG_FIELD_ONLY,                // This effect is registered to the global environment
    EFFECT_FLAG_CARD_TARGET,               // The effect includes targetting a card
    EFFECT_FLAG_IGNORE_RANGE,              // Card affecting all areas "(Prohibition", "Imperial Iron Wall")
    EFFECT_FLAG_ABSOLUTE_TARGET,           // Target Range does not change due to changes in control
    EFFECT_FLAG_IGNORE_IMMUNE,             // Effect applies regardless of a card being "Unaffected by card effects"
    EFFECT_FLAG_SET_AVAILABLE,             // Effect applies to face-down ("Set") cards
    EFFECT_FLAG_CANNOT_NEGATE,             // For effects that say "This effect cannot be negated." in their text
    EFFECT_FLAG_CANNOT_DISABLE,            // Effect cannot be negated
    EFFECT_FLAG_PLAYER_TARGET,             // Effect targets a player (Mystical Refpanel)
    EFFECT_FLAG_BOTH_SIDE,                 // Effect affects both sides of the field
    EFFECT_FLAG_COPY_INHERIT,              // Effect is inherited by a card that copies it
    EFFECT_FLAG_DAMAGE_STEP,               // Effect can activate during the Damage Step
    EFFECT_FLAG_DAMAGE_CAL,                // Effect can activate during Damage Calculation, a sub-step of the Damage Step.
    EFFECT_FLAG_DELAY,                     // By adding this delay flag, the effect is prevented from missing the timing
    EFFECT_FLAG_SINGLE_RANGE,              // The effect that has this flag is only valid for the card itself
    EFFECT_FLAG_UNCOPYABLE,                // The effect that has this flag cannot be copied
    EFFECT_FLAG_OATH,                      // Oath effect
    EFFECT_FLAG_SPSUM_PARAM,               // Flag to indicate in a special summon in which zone(s) of the field and to which player. (eg. SetTargetRange in "Lava Golem")
    EFFECT_FLAG_REPEAT,                    // God's incarnation's attack power is double counted
    EFFECT_FLAG_NO_TURN_RESET,             // Flag used for effects that "can only be used once while this card is face-up on the field", e.g. Wind-Up monsters.
    EFFECT_FLAG_EVENT_PLAYER,              // As the other player's effect (action?)
    EFFECT_FLAG_OWNER_RELATE,              // Continues to be the object
    EFFECT_FLAG_CANNOT_INACTIVATE,         // An effect with this flag cannot have its activation negated
    EFFECT_FLAG_CLIENT_HINT,               // A client prompt/description
    EFFECT_FLAG_CONTINUOUS_TARGET,         //
    EFFECT_FLAG_LIMIT_ZONE,                // When this flag is added to an effect, using that effect would cause the number of zones available to decrease (see Draco Face-off). The SetValue must be used to define the zones that will still be available with the activation.
    EFFECT_FLAG_IMMEDIATELY_APPLY,         // The effect of the card immediately when launched (Toon Kingdom)
    EFFECT_FLAG2_CONTINUOUS_EQUIP,         // This flag allows Continuous Traps that equip themselves to use their trigger/quick effects while equipped
    EFFECT_FLAG2_COF,                      // Normal Spell that activates during the Standby Phase (Curse of Fiend)
    EFFECT_FLAG2_CHECK_SIMULTANEOUS,       //
    EFFECT_FLAG2_FORCE_ACTIVATE_LOCATION,  //
    EFFECT_FLAG2_MAJESTIC_MUST_COPY,       // If flag is used, effect will be copied in MajesticCopy wherein normally only trigger effects will be copied.
    
    // 7 Effect codes
    EFFECT_IMMUNE_EFFECT,                  // Affected card is unaffected by card effects. The SetValue of this effect takes the following parameters: e: this effect itself re: the effect that would affect the card. c: the card that would be affected (uncertain, to be confirmed)
    EFFECT_DISABLE,                        // Ineffective (skills extraction)
    EFFECT_CANNOT_DISABLE,                 // The affected card cannot have its effects negated
    EFFECT_SET_CONTROL,                    // The affected card's control is set to a given player. The player should be defined in SetValue (SetValue receives e and c)
    EFFECT_CANNOT_CHANGE_CONTROL,          // Control of the affected card cannot change. Does not take a SetTarget or Setvalue.
    EFFECT_CANNOT_ACTIVATE,                // The affected player(s) cannot activate the effects that match this effect's SetValue. SetValue takes the following parameters: e = this effect re = the effect would be activated tp = the player that would activate the effect
    EFFECT_CANNOT_TRIGGER,                 // The affected card cannot activate its effects. Usually used as EFFECT_TYPE_SINGLE. If a field version is used, cards that return true for the SetTarget are the ones that cannot activate their effects. In this card, SetTarget receives e and c as parameters.
    EFFECT_DISABLE_EFFECT,                 // The affected card has its effects negated
    EFFECT_DISABLE_CHAIN,                  // Affected card has its activation negated
    EFFECT_DISABLE_TRAPMONSTER,            // Negates Trap monsters
    EFFECT_CANNOT_INACTIVATE,              // Affected cards (single range or via set target range) cannot have the activation of their effect(s) negated. If SetValue is used, it receives the following parameters: e: this effect itself chaincount:
    EFFECT_CANNOT_DISEFFECT,               // Affected cards cannot have the resolution of their effects negated. If SetValue is used, it receives the following parameters: e: this effect itself chaincount: the chain associated with the effect. Can be used in Duel.GetChainInfo
    EFFECT_CANNOT_CHANGE_POSITION,         // Affected card cannot change its battle position. Usually used as a single effect but if a field version is used, SetTarget receives e and c as parameters.
    EFFECT_TRAP_ACT_IN_HAND,               // The affected Trap Card can be activated from the hand. If the card is not TYPE_TRAP, this effect is skipped. Usually used as EFFECT_TYPE_SINGLE if a field version is used SetTarget receives e and c as parameters. It is suggested that SetDescription is also applied with this effect, for the scenarios where multiple similar effects are available, to allow the player to choose which one to apply.
    EFFECT_TRAP_ACT_IN_SET_TURN,           // Affected Trap Card can be activated the turn it was set. If the card is not TYPE_TRAP and/or does not have STATUS_SET_TURN, this effect is skipped. The property EFFECT_FLAG_SET_AVAILABLE should be set. Usually used as EFFECT_TYPE_SINGLE if a field version is used SetTarget receives e and c as parameters. It is suggested that SetDescription is also applied with this effect, for the scenarios where multiple similar effects are available, to allow the player to choose which one to apply.
    EFFECT_REMAIN_FIELD,                   // Affected card remains on the field (e.g. Swords of Revealing Light)
    EFFECT_MONSTER_SSET,                   // The affected monster can be placed in the Spell/Trap zone. SetValue should hold the type the card is set as (for example, TYPE_SPELL). See Artifact monsters
    EFFECT_QP_ACT_IN_SET_TURN,             // Allows Quick-Play Spells to be activated the turn they are set. This effect is skipped if any of the following 3 tests is false: the card is TYPE_SPELL, the card is TYPE_QUICKPLAY or has EFFECT_BECOME_QUICK, the card has STATUS_SET_TURN. Usually used as EFFECT_TYPE_SINGLE if a field version is used SetTarget receives e and c as parameters. It is suggested that SetDescription is also applied with this effect, for the scenarios where multiple similar effects are available, to allow the player to choose which one to apply.
    EFFECT_CANNOT_SUMMON,                  // The affected player cannot Normal Summon. A field effect that requires EFFECT_FLAG_PLAYER_TARGET to be set and the players to be defined in SetTargetRange. SetTarget receives the following parameters: e: this effect itself c: the card that would be summoned sump: the player that would Summon sumtyp: the summon type sumpos: the summon position (fixed as POS_FACEUP in the core) tp: the target player (the player that would get the monster)
    EFFECT_CANNOT_FLIP_SUMMON,             // The affected player cannot Flip Summon.The target function of this effect receives the following parameters: <br/> e = this effect (EFFECT_CANNOT_FLIP_SUMMON) <br/> c = the card that would be affected by it (the ones that cannot be Special Summoned) <br/> playerid = the player that would do the summon
    EFFECT_CANNOT_SPECIAL_SUMMON,          // The affected player cannot Special Summon. Requires the property EFFECT_FLAG_PLAYER_TARGET and the players defined via SetRange. The target function of this effect receives the following parameters:<br/>e = this effect (EFFECT_CANNOT_SPECIAL_SUMMON)<br/>c = the card that would be affected by it (the ones that cannot be Special Summoned)<br/>playerid = the player that would do the summon<br/>sumtype = the type of the summon sumpos = the position in which the monster would be summoned in toplayer = the player that would receive the monster <br/> sumeff = the effect that would summon
    EFFECT_CANNOT_MSET,                    // Affected player cannot Set monsters. This effect's SetTarget takes the following parameters:<br/>e: this effect itself<br/>c: the cards affected by it<br/>playerid: the player that would Set<br/>sumtype: the summon type<br/>toplayer: the player that would receive the monster<br/>sumpos: the position in which the monsters would be summoned (fixed as POS_FACEDOWN by the core)
    EFFECT_CANNOT_SSET,                    // The affected player (set via SetTargetRange, with EFFECT_FLAG_PLAYER_TARGET as property) cannot set Spell/Trap cards. If a target function is used, the following parameters are passed to it:<br/>e: this effect itself <br/>c: the card(s) that cannot be set <br/>tp: the player that cannot set  (to be confirmed, might be player whose field cannot have cards set)
    EFFECT_CANNOT_DRAW,                    // The affected player cannot draw cards
    EFFECT_CANNOT_DISABLE_SUMMON,          // The affected monster cannot have its Normal Summon negated
    EFFECT_CANNOT_DISABLE_SPSUMMON,        // The affected monster cannot have its Special Summon negated
    EFFECT_SET_SUMMON_COUNT_LIMIT,         // Limit the number of monsters placed per turn
    EFFECT_EXTRA_SUMMON_COUNT,             // Increases the number of Normal Summons the player can make. The value should be set in SetValue.
    EFFECT_SPSUMMON_CONDITION,             // The affected monster has an Special Summon condition that must be fulfilled. Cards/effects that return true for the SetValue are allowed to Special Summmon the monster. SetValue for this function takes the following parameters: <br/>effect: this effect itself <br/>sum_effect: the effect that would summon <br/>sum_player: the player that would summon <br/>sum_type: the summon type what would be used for the summon <br/>sum_pos: the position in which the monster would be summoned <br/>toplayer: the player that would receive the monster
    EFFECT_REVIVE_LIMIT,                   // The affected card must be Special Summoned properly before being Special Summoned from public locations
    EFFECT_SUMMON_PROC,                    // Specifies a special method through which the affected card can be Normal Summoned
    EFFECT_LIMIT_SUMMON_PROC,              // Specifies a special method through which the affected card must be Normal Summoned
    EFFECT_SPSUMMON_PROC,                  // Specifies a special method through which the affected card can be Special Summoned
    EFFECT_EXTRA_SET_COUNT,                // Increase the number of monsters the player can set (usually 1 Normal Summon/Set per turn)
    EFFECT_SET_PROC,                       // Specifies a special method through which the affected card can be Normal Set
    EFFECT_LIMIT_SET_PROC,                 // Specifies a special method through which the affected card must be Normal Set
    EFFECT_LIGHT_OF_INTERVENTION,          // Monsters can be Normal Summoned in face-up Defense Position (Light of Intervention).
    EFFECT_CANNOT_DISABLE_FLIP_SUMMON,     // The Flip Summon of the affected monster cannot be negated (Spell Wall)
    EFFECT_INDESTRUCTABLE,                 // Affected card cannot be destroyed. SetValue receives the following parameters: <br/>e: this effect itself <br/>re: reason effect, the effect that would cause the destruction <br/>r: reason, always considered as REASON_EFFECT by the core rp: reason player
    EFFECT_INDESTRUCTABLE_EFFECT,          // Affected card cannot be destroyed by card effect. SetValue receives the following parameters: <br/>e: this effect itself <br/>re: reason effect, the effect that would cause the destruction <br/>rp: reason player, the player that would cause the destruction <br/>c: this card (to be confirmed)
    EFFECT_INDESTRUCTABLE_BATTLE,          // Affected card cannot be destroyed by battle
    EFFECT_UNRELEASABLE_SUM,               // Affected card cannot be tributed for a Tribute Summon. SetValue in this effect receives only <code>e</code> and <code>c</code> as parameters.
    EFFECT_UNRELEASABLE_NONSUM,            // Affected card cannot be tributed for effects. SetValue in this effect receives only <code>e</code> and <code>c</code> as parameters.
    EFFECT_DESTROY_SUBSTITUTE,             // Required alternative to destruction (this card is destroyed with other cards instead). SetValue receives the following parameters: <br/>e: this effect itself <br/>re: reason effect (confirm in the core, might default to current.reason_effect) r: reason  (confirm in the core, might default to current.reasont) <br/>rp: reason player (confirm in the core, might default to current.reason_player)
    EFFECT_CANNOT_RELEASE,                 // Affected player cannot tribute monsters. Requires the players to be set via SetTargetRange (and the EFFECT_FLAG_PLAYER_TARGET flag). Cards that return true for the SetTarget in this effect cannot be tributed by that player. SetTarget takes the following parameters: -e: this effect itself -c: the card(s) that would be tributed (to be confirmed) -tp: the player that would tribute
    EFFECT_INDESTRUCTABLE_COUNT,           // Affected card cannot be destroyed up to a given number of times. SetValue receives the following parameters: e: this effect itself re: reason effect, the effect that would cause the destruction rp: reason player, the player that would cause the destruction c: this card (to be confirmed)
    EFFECT_UNRELEASABLE_EFFECT,            // Affected card cannot be Tributed by card effects.  SetValue receives the following parameters: <br/>e: this effect itself <br/>re: reason effect, the effect that would tribute the card <br/>rp: reason player, the player that would tribute the card <br/>c: this card (to be confirmed)
    EFFECT_DESTROY_REPLACE,                // If the affected card would be destroyed, perform a given operation instead
    EFFECT_RELEASE_REPLACE,                // If the affected card would be Tributed, perform a given operation instead
    EFFECT_SEND_REPLACE,                   // Card is sent to some location instead of another (Madolche Chateau)
    EFFECT_CANNOT_DISCARD_HAND,            // Affected player cannot send cards from their hand to the graveyard. SetTarget receives the following parameters: -e: this effect itself -c: the card that would be discarded -re: the effect that would discard the cards -r: the reason for the discard
    EFFECT_CANNOT_DISCARD_DECK,            // Affected player cannot send cards from their deck to the graveyard. SetTarget is not used in this effect
    EFFECT_CANNOT_USE_AS_COST,             // The affected card cannot be used as Cost. Usually used as a single effect. Does not use SetTarget
    EFFECT_CANNOT_PLACE_COUNTER,           // The affected player cannot place counters (See Gate Blocker). The SetTarget in this effect takes the following parameters: -e: this effect itself -c: the cards that cannot receive the counters (to be confirmed) -tp: the player that cannot place the counters -ctype: the type of the counter that cannot be placed -count: the ammount of counters that cannot be placed
    EFFECT_CANNOT_TO_GRAVE_AS_COST,        // The affected card cannot be sent to the GY.
    EFFECT_LEAVE_FIELD_REDIRECT,           // If the affected card would leave the field, sends it to another given location instead. The location must be set in SetValue
    EFFECT_TO_HAND_REDIRECT,               // If the affected card would go to the hand, sends it to another given location instead. The location must be set in SetValue
    EFFECT_TO_DECK_REDIRECT,               // If the affected card would go to the deck, sends it to another given location instead.  The location must be set in SetValue
    EFFECT_TO_GRAVE_REDIRECT,              // If the affected card would go to the graveyard, sends it to another given location instead. The location must be set in SetValue
    EFFECT_REMOVE_REDIRECT,                // If the affected card would be removed, sends it to another given location instead. The location must be set in SetValue.
    EFFECT_CANNOT_TO_HAND,                 // Affected card cannot be send to the hand. If it is used as a field effect, cards that return true for the SetTarget cannot be sent to the hand. SetTarget receives the following parameters: e: this effect itself c: the card that would be sent to the hand tp: the player that would send the card re: reason effect (defaults to core.reason_effect, to be confirmed)
    EFFECT_CANNOT_TO_DECK,                 // Affected card cannot be sent to the deck. If it is used as a field effect, cards that return true for the SetTarget cannot be sent to the hand. SetTarget receives the following parameters: e: this effect itself c: the card that would be sent to the Deck tp: the player that would send the card
    EFFECT_CANNOT_REMOVE,                  // Affected card cannot be banished. If it is used as a field effect, cards that return true for the SetTarget cannot be banished. SetTarget receives the following parameters: e: this effect itself c: the card that would be banished tp: the player that would banish re:the reason that would be applied to the banishing re: reason effect (defaults to core.reason_effect, to be confirmed)
    EFFECT_CANNOT_TO_GRAVE,                // The affected card(s) cannot be sent to the Graveyard. If used as a field effect, only e and c are passed to SetTarget
    EFFECT_CANNOT_TURN_SET,                // The affected card cannot be turned face-down ("Set"). If used as a field effect, only e and c are passed to SetTarget
    EFFECT_CANNOT_BE_BATTLE_TARGET,        // The affected card cannot be targeted for an attack
    EFFECT_CANNOT_BE_EFFECT_TARGET,        // Affected card cannot be targeted by card effects. When used as a single effect, SetTarget takes: e, re, rp
    EFFECT_IGNORE_BATTLE_TARGET,           // Affected card cannot be targeted for an attack, but it doesn't prevent direct attack.
    EFFECT_CANNOT_DIRECT_ATTACK,           // Affected card cannot attack directly
    EFFECT_DIRECT_ATTACK,                  // Affected card can make a direct attack.
    EFFECT_DUAL_STATUS,                    // Affected card is a Gemini Monster that has its effect
    EFFECT_EQUIP_LIMIT,                    // Equipment object restrictions
    EFFECT_DUAL_SUMMONABLE,                // Affected card can be Normal Summon on the field as a Gemini Monster
    EFFECT_REVERSE_DAMAGE,                 // If the affected player would take damage, they gain that much LP instead. SetValue in this effect receives the following parameters: e: this effect itself re: reason effect r: reason rp: reason player rc: reason card
    EFFECT_REVERSE_RECOVER,                // If the affected player would gain LP, they take that much damage instead. SetValue in this effect receives the following parameters: <br/>e: this effect itself <br/> r: reason<br/>rp: reason player
    EFFECT_CHANGE_DAMAGE,                  // Modify the amount of damage the affected player would take
    EFFECT_REFLECT_DAMAGE,                 // If the affected player would take damage, their opponent takes damage instead. SetValue in this effect receives the following parameters: e: this effect itself amount: the amount of damage re: reason effect r: reason rp: reason player rc: reason card
    EFFECT_CANNOT_ATTACK,                  // Affected card cannot attack
    EFFECT_CANNOT_ATTACK_ANNOUNCE,         // Affected card cannot declare attacks (but can finish conducting an attack responded to with this effect, Threatening Roar)
    EFFECT_CANNOT_CHANGE_POS_E,            // Affected card's battle position cannot be changed by card effects (Raging Cloudian)
    EFFECT_ACTIVATE_COST,                  // Affected player must pay a cost to activate effects
    EFFECT_SUMMON_COST,                    // The affected player must pay a cost to Normal Summon. The parameters this effect's target receives are: e = this effect itself c = this card tp = the player that would summon
    EFFECT_SPSUMMON_COST,                  // The affected player must pay a cost to Special Summon. The parameters this effect's target receives are: e = this effect itself c = this card tp = the player that would summon sumtype = the type of the summon
    EFFECT_FLIPSUMMON_COST,                // Affected player must pay a cost to Flip Summon. The parameters this effect's target receives are: e = this effect itself c = this card tp = the player that would summon
    EFFECT_MSET_COST,                      // The affected player must pay a cost to Set monsters. The parameters this effect's target receives are: e = this effect itself c = this card tp = the player that would set the monsters
    EFFECT_SSET_COST,                      // The affected player must pay a cost to Set Spell/Traps. The parameters this effect's target receives are:
    EFFECT_ATTACK_COST,                    // The affected player must pay a cost to attack. The parameters this effect's target receives are: <br/> e = this effect itself <br/> c = this card <br/> tp = the player that would attack
    EFFECT_UPDATE_ATTACK,                  // Changes the ATK of a monster by a value (taken from the return in Effect.SetValue())
    EFFECT_SET_ATTACK,                     // Sets the current ATK of a monster to a value evaluated in Effect.SetValue()
    EFFECT_SET_ATTACK_FINAL,               // Set the attack of a monster, overriding other changes  (taken from the return in Effect.SetValue())
    EFFECT_SET_BASE_ATTACK,                // Set the original attack of a monster
    EFFECT_UPDATE_DEFENSE,                 // Change the defense of a monster by a value (written into Effect.SetValue())
    EFFECT_SET_DEFENSE,                    // Set the defense of a monster
    EFFECT_SET_DEFENSE_FINAL,              // Set the defense of a monster, overriding other changes (written into Effect.SetValue())
    EFFECT_SET_BASE_DEFENSE,               // Set the original defense of a monster
    EFFECT_REVERSE_UPDATE,                 // Any change to ATK and DEF is reversed (For the effects of 'Reverse Trap')
    EFFECT_SWAP_AD,                        // Swap the affected card's ATK and DEF
    EFFECT_SWAP_BASE_AD,                   // Swap the affected card's original ATK and DEF
    EFFECT_SWAP_ATTACK_FINAL,              // Set the final attack (used to exchange offensive and defensive)
    EFFECT_SWAP_DEFENSE_FINAL,             // Set the final defense (for exchange of offensive and defensive)
    EFFECT_ADD_CODE,                       // Treats a Card(s) as another Card by adding one additional Code (ID) to it (written into Effect.SetValue())
    EFFECT_CHANGE_CODE,                    // Treats a Card(s) as one different Card by overwriting its Code(s) (ID(s)) it currently has (written into Effect.SetValue())
    EFFECT_ADD_TYPE,                       // Treats a Card(s) as a additional type(s) (written into Effect.SetValue())
    EFFECT_REMOVE_TYPE,                    // Treats a Card(s) as not a type(s) (written into Effect.SetValue())
    EFFECT_CHANGE_TYPE,                    // Treats a Card(s) as another type overwriting its type (written into Effect.SetValue())
    EFFECT_REMOVE_CODE,                    //
    EFFECT_ADD_RACE,                       // Treats a Card(s) as a additional race(s) (written into Effect.SetValue())
    EFFECT_REMOVE_RACE,                    // Treats a Card(s) as not a race(s) (written into Effect.SetValue())
    EFFECT_CHANGE_RACE,                    // Treats a Card(s) as another type overwriting its type (written into Effect.SetValue())
    EFFECT_ADD_ATTRIBUTE,                  // Treats a Card(s) as a additional element(s) (written into Effect.SetValue())
    EFFECT_REMOVE_ATTRIBUTE,               // Treats a Card(s) as not a element(s) (written into Effect.SetValue())
    EFFECT_CHANGE_ATTRIBUTE,               // Treats a Card(s) as another element overwriting its element (written into Effect.SetValue())
    EFFECT_UPDATE_LEVEL,                   // Increase/decrease affected card's level by a value (written into Effect.SetValue())
    EFFECT_CHANGE_LEVEL,                   // Set affected card's level to a value (written into Effect.SetValue())
    EFFECT_UPDATE_RANK,                    // Increase/decrease affected card's rank by a value (written into Effect.SetValue())
    EFFECT_CHANGE_RANK,                    // Set affected card's rank to a value (written into Effect.SetValue())
    EFFECT_UPDATE_LSCALE,                  // Increase/decrease affected card's left pendulum scale (blue scale) by a value (written into Effect.SetValue())
    EFFECT_CHANGE_LSCALE,                  // Set affected card's left pendulum scale (blue scale) to a value (written into Effect.SetValue())
    EFFECT_UPDATE_RSCALE,                  // Increase/decrease affected card's right pendulum scale (red scale) by a value (written into Effect.SetValue())
    EFFECT_CHANGE_RSCALE,                  // Set affected card's right pendulum scale (red scale) to a value (written into Effect.SetValue())
    EFFECT_SET_POSITION,                   // Set affected card's battle position to a given value
    EFFECT_SELF_DESTROY,                   // Affected card destroys itself
    EFFECT_SELF_TOGRAVE,                   // Affected card sends itself to the graveyard, requires enabling GLOBALFLAG_SELF_TOGRAVE
    EFFECT_DOUBLE_TRIBUTE,                 // Treats a card as 2 tributes for a tribute summon
    EFFECT_DECREASE_TRIBUTE,               // Decreases the ammount of tributes to perform a Tribute Summon
    EFFECT_DECREASE_TRIBUTE_SET,           // Decreases the ammount of tributes to perform a Tribute Set
    EFFECT_EXTRA_RELEASE,                  // The affected card must be used when performing a tribute (Soul Exchange)
    EFFECT_TRIBUTE_LIMIT,                  // The affected card has restriction for the tribute summon
    EFFECT_EXTRA_RELEASE_SUM,              // Allows, optionally, to tributed the affected card (Monarch's Stormforth, Vampire Sucker)
    EFFECT_TRIPLE_TRIBUTE,                 // Treats a card as 2 and 3 tributes for a tribute summon
    EFFECT_ADD_EXTRA_TRIBUTE,              // The affected card can use as tribute other cards (than the default ones). Requires SetTargetRange and SetTarget
    EFFECT_EXTRA_RELEASE_NONSUM,           // The affected card can be tributed (by a cost ?) even if it is controled by the opponent. SetValue in this effect receives the following parameters: e: this effect itself re: reason effect (to be confirmed: defaults to core.reason_effect) rp: reason player(to be confirmed: defaults to core.reason_player)
    EFFECT_PUBLIC,                         // Affected card becomes public knowledge
    EFFECT_COUNTER_PERMIT,                 // Allow placement of counter type
    EFFECT_COUNTER_LIMIT,                  // Allowed to place the number of counters
    EFFECT_RCOUNTER_REPLACE,               // Instead of removing the counter
    EFFECT_LPCOST_CHANGE,                  // Modify the amount of LP a given player must pay for a cost
    EFFECT_LPCOST_REPLACE,                 // If the affected player would pay LP for a cost, perform a given operation instead
    EFFECT_SKIP_DP,                        // Skip affected player's draw phase (used with SetTargetRange(tp value,1-tp value), 0 for not affected, 1 for affect)
    EFFECT_SKIP_SP,                        // Skip affected player's standby phase (used with SetTargetRange(tp value,1-tp value), 0 for not affected, 1 for affect)
    EFFECT_SKIP_M1,                        // Skip affected player's main phase 1 (used with SetTargetRange(tp value,1-tp value), 0 for not affected, 1 for affect)
    EFFECT_SKIP_BP,                        // Skip affected player's battle phase (used with SetTargetRange(tp value,1-tp value), 0 for not affected, 1 for affect)
    EFFECT_SKIP_M2,                        // Skip affected player's main phase 2 (used with SetTargetRange(tp value,1-tp value), 0 for not affected, 1 for affect)
    EFFECT_CANNOT_BP,                      // The affected player cannot enter the Battle Phase
    EFFECT_CANNOT_M2,                      // The affected player cannot enter the Main Phase 2
    EFFECT_CANNOT_EP,                      // The affected player cannot enter the End Phase
    EFFECT_SKIP_TURN,                      // The affected player's whole next turn is skipped
    EFFECT_SKIP_EP,                        // The affected player's End Phase is skipped
    EFFECT_DEFENSE_ATTACK,                 // Affected card can attack while in defense position. The stats it uses depends on Effect.Setvalue (if any), where it applies DEF if effect value is 1 and atk if it is 0 or doesn't exist.
    EFFECT_MUST_ATTACK,                    // Affected card must attack if able
    EFFECT_FIRST_ATTACK,                   // Affected card must attack before its controller's other monsters
    EFFECT_ATTACK_ALL,                     // Affected card can attack all valid attack targets once each. SetValue receives the following parameters: e: this effect itself c: the cards that can be attack target
    EFFECT_EXTRA_ATTACK,                   // Affected card can make a given number of additional attacks
    EFFECT_ONLY_BE_ATTACKED,               // Only the affected card can be attacked
    EFFECT_ATTACK_DISABLED,                // The affected card's attack has been negated (shows application of Duel.NegateAttack() )
    EFFECT_CHANGE_BATTLE_STAT,             // Changes the values used to calculate damage, during damage calculation only. Doesnt actually change the values, only what is calculated
    EFFECT_NO_BATTLE_DAMAGE,               // No battle damage is dealt when the affected card battles
    EFFECT_AVOID_BATTLE_DAMAGE,            // The controller of the affected card does not take battle damage when it battles
    EFFECT_REFLECT_BATTLE_DAMAGE,          // If the controller of the affected card would take battle damage from a battle involving that card, the opponent takes the damage
    EFFECT_PIERCE,                         // The affected monster deals piercing battle damage
    EFFECT_BATTLE_DESTROY_REDIRECT,        // If the affected card is destroyed by battle, send it to a given location
    EFFECT_BATTLE_DAMAGE_TO_EFFECT,        // The affected card deals effect damage when it battles (Gravekeeper's Vassal)
    EFFECT_BOTH_BATTLE_DAMAGE,             // Both players take the battle damage. See Double-Edged Sword
    EFFECT_ALSO_BATTLE_DAMAGE,             // The opponent also takes the battle damage. See Lyrilusc - Recital Starling
    EFFECT_CHANGE_BATTLE_DAMAGE,           //
    EFFECT_TOSS_COIN_REPLACE,              // If an effect requires a coin toss, replace it with a given result instead
    EFFECT_TOSS_DICE_REPLACE,              // If an effect requires a dice roll, replace it with a given result instead
    EFFECT_TOSS_COIN_CHOOSE,               //
    EFFECT_TOSS_DICE_CHOOSE,               //
    EFFECT_FUSION_MATERIAL,                // Can be used as Fusion material
    EFFECT_CHAIN_MATERIAL,                 // When Fusion Summoning, the affected player can banish materials from the hand, field, deck or graveyard instead (Chain Material)
    EFFECT_SYNCHRO_MATERIAL,               // Can be used as Synchro material
    EFFECT_XYZ_MATERIAL,                   // Can be used as Xyz material
    EFFECT_FUSION_SUBSTITUTE,              // When Fusion Summoning, the affected card can be used to substitute for any specifically named material
    EFFECT_CANNOT_BE_FUSION_MATERIAL,      // Affected card cannot be used as Fusion material
    EFFECT_CANNOT_BE_SYNCHRO_MATERIAL,     // Affected card cannot be used as Synchro material. SetValue takes the following parameters:
    EFFECT_SYNCHRO_MATERIAL_CUSTOM,        // Coexistence of material constraints
    EFFECT_CANNOT_BE_XYZ_MATERIAL,         // Affected card cannot be used as Xyz material. SetValue takes the following parameters: e: this effect c: the card(s) for which this card cannot be used as material
    EFFECT_CANNOT_BE_LINK_MATERIAL,        // Cannot be used as Link Material. SetValue takes the following parameters: e: this effect c: the card(s) for which this card cannot be used as material
    EFFECT_SYNCHRO_LEVEL,                  // Affected card can be treated as a given level if used for a Synchro Summon
    EFFECT_RITUAL_LEVEL,                   // Affected card can be treated as a given level if used for a Ritual Summon
    EFFECT_XYZ_LEVEL,                      // Affected card can be treated as a given level if used for an Xyz Summon
    EFFECT_EXTRA_RITUAL_MATERIAL,          // Affected card can be used for a Ritual Summon in addition to what the Ritual Spell states (e.g. Sphere Kuriboh). If used as EFFECT_FLAG_SINGLE_RANGE, use SetValue , which takes the following parameters: e: this effect rc: the monster that would be summoned using this card. If used as EFFECT_TYPE_FIELD, SetValue is not considered. SetTarget should be used instead, which takes the following parameters: e: this effect c: the card(s) that can be used as extra ritual materials (the cards affected by this effect)
    EFFECT_NONTUNER,                       // Affected card can be treated as a non-Tuner despite being a Tuner (Phantom King Hydride). When used as a single effect, SetValue receives the following parameters: e: this effect sc: the monster that would use this card as material
    EFFECT_OVERLAY_REMOVE_REPLACE,         // Replaces detaching Xyz materials from monsters by some other operation. SetCondition must be used to match the exact effects that can be replaced. SetOperation must return something.
    EFFECT_CANNOT_BE_MATERIAL,             // The card cannot be used as material. Requires the summon type for which the material can't be used to be defined via SetValue. SetValue takes the following parameters: -sum_type -playerid
    EFFECT_PRE_MONSTER,                    // Can access the monster's value (Card.AddMonsterAttribute () only)
    EFFECT_MATERIAL_CHECK,                 // Applies a check to the materials used. The SetValue in this effect takes as parameter e and c
    EFFECT_DISABLE_FIELD,                  // Given card zones cannot be used. The zones affected must be defined via SetOperation
    EFFECT_USE_EXTRA_MZONE,                // Card uses an additional Monster zone
    EFFECT_USE_EXTRA_SZONE,                // Card uses an additional Spell/Trap zone
    EFFECT_MAX_MZONE,                      // The maximum number of monsters
    EFFECT_MAX_SZONE,                      // Maximum number of Spell/Trap zone
    EFFECT_FORCE_MZONE,                    // Forces a zone to be used (see Dai Dance).The target function of this effect receives the following parameters: e = this effect (EFFECT_FORCE_MZONE) c = the card that would be affected by it (the ones that cannot be Special Summoned) playerid = the player that would do the summon sumtype = the type of the summon toplayer = the player that would receive the monster sumef = the effect that would summon
    EFFECT_BECOME_LINKED_ZONE,             // Makes a zone linked
    EFFECT_HAND_LIMIT,                     // Change the maximum number of cards the affected player can have in their hand during the End Phase. The new value should be provided via SetValue.
    EFFECT_DRAW_COUNT,                     // Change the number of cards the affected player draws for their Draw Phase
    EFFECT_SPIRIT_DONOT_RETURN,            // Affected card does not return to the hand in the End Phase even if a Spirit Monster
    EFFECT_SPIRIT_MAYNOT_RETURN,           // Affected card optionally may not return to the hand in the End Phase even if a Spirit Monster
    EFFECT_CHANGE_ENVIRONMENT,             // The active Field Spell is treated as a given card if none exists (Maiden of the Aqua, Gravekeeper's Priestess)
    EFFECT_NECRO_VALLEY,                   // Cannot affect cards in the Graveyard (Necrovalley)
    EFFECT_FORBIDDEN,                      // Card cannot be used (Prohibition, Psi-Blocker)
    EFFECT_NECRO_VALLEY_IM,                // Affected card is unaffected by the effects of Necrovalley
    EFFECT_REVERSE_DECK,                   // Flip affected player's deck upside-down, used with GLOBALFLAG_DECK_REVERSE_CHECK, set the player afected with SetTargetRange(,)
    EFFECT_REMOVE_BRAINWASHING,            // Control of all monsters is returned to their owner
    EFFECT_BP_TWICE,                       // The affected player can conduct two Battle Phases (e.g. Weather Report)
    EFFECT_UNIQUE_CHECK,                   // There can only be one on the field (Card.SetUniqueOnField () only)
    EFFECT_MATCH_KILL,                     // When the affected card reduces its controller's opponent's LP to 0 by a direct attack, its controller wins the match.
    EFFECT_SYNCHRO_CHECK,                  // Genomix Fighter
    EFFECT_QP_ACT_IN_NTPHAND,              // A Quick Play Spell affected can be activated from the hand during the turn of the opponent's turn
    EFFECT_MUST_BE_SMATERIAL,              // Deprecated. Use EFFECT_MUST_BE_MATERIAL with REASON_SYNCHRO in the SetValue
    EFFECT_TO_GRAVE_REDIRECT_CB,           // If the affected card would be sent to the graveyard, executes another operation instead (Crystal Beast monsters)
    EFFECT_CHANGE_LEVEL_FINAL,             // Set affected card's level to a value, overriding other changes
    EFFECT_CHANGE_RANK_FINAL,              // Set affected card's rank to a value, overriding other changes
    EFFECT_MUST_BE_FMATERIAL,              // Deprecated. Use EFFECT_MUST_BE_MATERIAL with REASON_FUSION in the SetValue
    EFFECT_MUST_BE_XMATERIAL,              // Deprecated. Use EFFECT_MUST_BE_MATERIAL with REASON_XYZ in the SetValue
    EFFECT_MUST_BE_LMATERIAL,              // Deprecated. Use EFFECT_MUST_BE_MATERIAL with REASON_LINK in the SetValue
    EFFECT_SPSUMMON_PROC_G,                // Pendulum Summon rules (e.g. Harmonic Oscilation)
    EFFECT_SPSUMMON_COUNT_LIMIT,           // Limit for the number of Special Summons
    EFFECT_LEFT_SPSUMMON_COUNT,            // The remaining number of Summoning (e.g Summon Breaker)
    EFFECT_CANNOT_SELECT_BATTLE_TARGET,    // The affected cards cannot be chosen to be an attack target
    EFFECT_CANNOT_SELECT_EFFECT_TARGET,    // The affected cards cannot activate their effects that target. SetValue takes the following parameters: e: this effect re: the effect that would be activated c: the cards that cannot activate the effect
    EFFECT_ADD_SETCODE,                    // Adds a setcode (archetype) to the affected card
    EFFECT_NO_EFFECT_DAMAGE,               // The affected player does not take damage from card effects
    EFFECT_UNSUMMONABLE_CARD,              // The affected card cannot be Normal Summoned
    EFFECT_DISABLE_CHAIN_FIELD,            // Deprecated and removed effect. See core's "effect.h"
    EFFECT_DISCARD_COST_CHANGE,            // Counter trap cards cost change (Guilding Ariadne)
    EFFECT_HAND_SYNCHRO,                   // Can Synchro Summon using monsters in the hand (e.g. Tatsunoko)
    EFFECT_ONLY_ATTACK_MONSTER,            // Affected card can only attack monster.
    EFFECT_MUST_ATTACK_MONSTER,            // Affected card must attack a monster, if abble.
    EFFECT_PATRICIAN_OF_DARKNESS,          // The affected player chooses the targets of their opponent's attacks
    EFFECT_EXTRA_ATTACK_MONSTER,           // Affected card can make a given number of additional attacks on monsters
    EFFECT_UNION_STATUS,                   //
    EFFECT_OLDUNION_STATUS,                //
    EFFECT_REMOVE_SETCODE,                 //
    EFFECT_CHANGE_SETCODE,                 // The affected card's setcode is changed to the new value, replacing the SetCode(s) it currently has
    EFFECT_ALWAYS_ATTACK,                  // Deprecated and removed effect. See core's "effect.h"
    EFFECT_EXTRA_FUSION_MATERIAL,          // Allows using affected cards as Fusion Materials
    EFFECT_ADD_LINK_CODE,                  // Deprecated and removed effect. See core's "effect.h". Add a code (ID/name) for the affected monster to have if used for a Link Summon
    EFFECT_ADD_LINK_SETCODE,               // Deprecated and removed effect. See core's "effect.h". Add a setcode (archetype) for the affected monster to have if used for a Link Summon
    EFFECT_EXTRA_MATERIAL,                 // Deprecated and removed effect. See core's "effect.h". Allows the use of an extra material in a group of materials to summon a monster (e.g. "Micro Coder). This effect is not defined in the core. See the utility for its implementation
    EFFECT_IRON_WALL,                      //
    EFFECT_CANNOT_LOSE_DECK,               // Prevent losing via Deckout
    EFFECT_CANNOT_LOSE_LP,                 // Prevent losing while LP is 0
    EFFECT_CANNOT_LOSE_EFFECT,             // Prevent losing via card effects
    EFFECT_BP_FIRST_TURN,                  // Allows entering Battle Phase during the first turn
    EFFECT_UNSTOPPABLE_ATTACK,             // Prevents the affected monster's attack from being negated
    EFFECT_ALLOW_NEGATIVE,                 // Allows the affected card to have negative levels
    EFFECT_SELF_ATTACK,                    // Allows players to attack themselves using monsters they control
    EFFECT_BECOME_QUICK,                   // The affected Spell cards can be played like Quick-Play spells
    EFFECT_LEVEL_RANK,                     // Gives Rank to an affected monster with a Level
    EFFECT_RANK_LEVEL,                     // Gives Level to an affected monster with a Rank
    EFFECT_LEVEL_RANK_S,                   // Gives Rank to an affected monster with a Level, Level and Rank are always synced.
    EFFECT_RANK_LEVEL_S,                   // Gives Level to an affected monster with a Rank, Level and Rank are always synced.
    EFFECT_UPDATE_LINK,                    // Increase/decrease affected card's Link Value by a value (written into Effect.SetValue())
    EFFECT_CHANGE_LINK,                    // Set affected card's Link Value by a value (written into Effect.SetValue())
    EFFECT_CHANGE_LINK_FINAL,              // Set affected card's Link Value to a value, overriding other changes
    EFFECT_ADD_LINKMARKER,                 // Add Link Markers to the affected card
    EFFECT_REMOVE_LINKMARKER,              // Remove Link Markers from the affected card
    EFFECT_CHANGE_LINKMARKER,              // Set's the affected card's Link Markers to the value provided
    EFFECT_FORCE_NORMAL_SUMMON_POSITION,   //
    EFFECT_FORCE_SPSUMMON_POSITION,        // This effect's SetTarget takes the following parameters: eff, pcard, playerid, sumtype, sumpos, toplayer, peffect
    EFFECT_DARKNESS_HIDE,                  // The affect players cannot see/confirm their face-down cards
    EFFECT_FUSION_MAT_RESTRICTION,         // 73941492+TYPE_FUSION. Used by the Fusion Summon procedure as an implementation of Harmonizing Magician's effect
    EFFECT_SYNCHRO_MAT_RESTRICTION,        // 73941492+TYPE_SYNCHRO. Used by the Synchro Summon procedure as an implementation of Harmonizing Magician's effect
    EFFECT_XYZ_MAT_RESTRICTION,            // 73941492+TYPE_XYZ. Used by the XyzSummon procedure as an implementation of Harmonizing Magician's effect
    
    // 8 Events
    EVENT_STARTUP,                         // This event is raised once, at the start of the duel
    EVENT_FLIP,                            // This event is raised when a card is flipped face-up
    EVENT_FREE_CHAIN,                      // An event that describes a timing at any valid response window or open game state
    EVENT_DESTROY,                         // This event is raised when a card is destroyed
    EVENT_REMOVE,                          // This event is raised when a card is banished
    EVENT_TO_HAND,                         // This event is raised when a card is sent to the hand (includes draw, search and return)
    EVENT_TO_DECK,                         // This event is raised when a card is sent to the deck
    EVENT_TO_GRAVE,                        // This event is raised whenn a card is sent to the graveyard
    EVENT_LEAVE_FIELD,                     // This event is raised when a card leaves the field
    EVENT_CHANGE_POS,                      // This event is raised when a card changes battle position
    EVENT_RELEASE,                         // This event is raised when a card is Tributed (includes tributing for a tribute summon, tributing by an effect and tributing by costs)
    EVENT_DISCARD,                         // This event is raised when a card is discarded
    EVENT_LEAVE_FIELD_P,                   // This event is raised when a card would leave the field (but before it actually leaves, so it still contains info on the field). Example of usage: in "Predaplanet", it is used to check if the card has Predacounters imediatelly before it leaves the field.
    EVENT_CHAIN_SOLVING,                   // This event is raised when a Chain Link is resolving
    EVENT_CHAIN_ACTIVATING,                // This event is raised when a Chain Link is activating
    EVENT_CHAIN_SOLVED,                    // This event is raised after a Chain Link resolves
    EVENT_CHAIN_NEGATED,                   // This event is raised when a chain link has its activation negated (after EVENT_CHAIN_ACTIVATING)
    EVENT_CHAIN_DISABLED,                  // This event is raised when the effect of a Chain Link is negated
    EVENT_CHAIN_END,                       // This event is raised when a Chain has fully resolved
    EVENT_CHAINING,                        // This event is raised when a chain is being built
    EVENT_BECOME_TARGET,                   // This event is raised when a card is targeted for an effect
    EVENT_DESTROYED,                       // This event is raised after a card is destroyed
    EVENT_MOVE,                            // This event is raised when a card moves from one location or sequence to another
    EVENT_ADJUST,                          // This event is raised when the game state changes (effectively working as some sort of EVENT_ANYCHANGE)
    EVENT_SUMMON_SUCCESS,                  // This event is raised when a monster is successfully Normal Summoned (which is timing for cards like Trap Hole)
    EVENT_FLIP_SUMMON_SUCCESS,             // This event is raised when a monster is successfully Flip Summoned (which is timing for cards like Trap Hole)
    EVENT_SPSUMMON_SUCCESS,                // This event is raised when a monster is successfully Special Summoned  (which is timing for cards like Torrential Tribute)
    EVENT_SUMMON,                          // This event is raised when a monster is being Normal Summoned (this is an attempt to perform a Normal Summon, aka "when a monster would be Summoned", for example, Bending Destiny's timing)
    EVENT_FLIP_SUMMON,                     // This event is raised when a monster is being Flip Summoned (this is an attempt to perform a Flip Summon, for example, Solemn Warning's timing)
    EVENT_SPSUMMON,                        // This event is raised when a monster is being Special Summoned (this is an attempt to perform a Special Summon, aka "when a monster would be Special Summoned", for example, Solemn Strike's timing)
    EVENT_MSET,                            // This event is raised when a monster is Set
    EVENT_SSET,                            // This event is raised when a Spell/Trap is set
    EVENT_BE_MATERIAL,                     // This event is raised when a card is used as material (e.g. for a Synchro Summon)
    EVENT_BE_PRE_MATERIAL,                 // Will be used as a fusion / ceremony of the same tune / excessive material
    EVENT_DRAW,                            // This event is raised when a card is drawn
    EVENT_DAMAGE,                          // This event is raised when a player takes damage, either by battle or by a card effect.
    EVENT_RECOVER,                         // When LP is gained
    EVENT_PREDRAW,                         // At the start of the Draw Phase
    EVENT_SUMMON_NEGATED,                  // This event is raised when a Summon is negated, to be detected by Witch's Strike.
    EVENT_FLIP_SUMMON_NEGATED,             // This event is raised when a Flip Summon is negated
    EVENT_SPSUMMON_NEGATED,                // This event is raised when a Special Summon is negated
    EVENT_CONTROL_CHANGED,                 // When control of a card changes
    EVENT_EQUIP,                           // This event is raised when a card is equipped
    EVENT_ATTACK_ANNOUNCE,                 // This event is raised when an attack is declared
    EVENT_BE_BATTLE_TARGET,                // This event is raised when a monster is targeted for an attack
    EVENT_BATTLE_START,                    // The start of the damage step
    EVENT_BATTLE_CONFIRM,                  // This event is raised when a monster battles another monster
    EVENT_PRE_DAMAGE_CALCULATE,            // Before the damage calculation
    EVENT_PRE_BATTLE_DAMAGE,               // Before battle damage applies
    EVENT_BATTLED,                         // After battle
    EVENT_BATTLE_DESTROYING,               // This event is raised when a monster is destroyed by battle
    EVENT_BATTLE_DESTROYED,                // This event is raised after a monster is destroyed by battle
    EVENT_DAMAGE_STEP_END,                 // At the end of the Damage Step
    EVENT_ATTACK_DISABLED,                 // This event is raised when an attack is negated
    EVENT_BATTLE_DAMAGE,                   // This event is raised when battle damage is taken
    EVENT_TOSS_DICE,                       // This event is raised when dice are rolled
    EVENT_TOSS_COIN,                       // This event is raised when coins are flipped
    EVENT_TOSS_COIN_NEGATE,                // This event is raised when coin tosses happen again, replacing previous result
    EVENT_TOSS_DICE_NEGATE,                // This event is raised when dice are re-rolled
    EVENT_LEVEL_UP,                        // This event is raised when the level of monster increases (might also be raised for general level changes, but only for single effect. check the core's implementation for details)
    EVENT_PAY_LPCOST,                      // This event is raised when LP is paid as a cost
    EVENT_DETACH_MATERIAL,                 // This event is raised when Xyz materials are detached (only the card that detaches the materials is availble in the event group, not the detached cards)
    EVENT_RETURN_TO_GRAVE,                 // Deprecated and removed event. See core's "effect.h". Card is being returned to the Graveyard
    EVENT_TURN_END,                        // This event is raised when the turn ends
    EVENT_PHASE,                           // This event is raised when a certain phase is reached (the required Phase value must be added to it, for example EVENT_PHASE+PHASE_END)
    EVENT_PHASE_START,                     // This event is raised at the start of a certain phase (the required Phase value must be added to it)
    EVENT_ADD_COUNTER,                     // This event is raised when a counter is placed on cards
    EVENT_REMOVE_COUNTER,                  // This event is raised when a counter is removed from cards
    EVENT_CUSTOM,                          // For custom events (Eg. Activate an effect of a card indicating EVENT_CUSTOM + <code> in Duel.RaiseEvent)</code>
    
    
    // 9 Categories, hints and card hints
    CATEGORY_DESTROY,                      // Describes that an effect destroys cards
    CATEGORY_RELEASE,                      // Describes that an effect tributes
    CATEGORY_REMOVE,                       // Describes that an effect banishes
    CATEGORY_TOHAND,                       // Describes that an effect adds a card to the hand (from any location)
    CATEGORY_TODECK,                       // Describes that an effect adds a card to the Deck (from any location)
    CATEGORY_TOGRAVE,                      // Describes that an effect sends a card to the Graveyard (from any location)
    CATEGORY_DECKDES,                      // Describes that an effect removes a card(s) from the Deck (to move them to the Graveyard or to banish them)
    CATEGORY_HANDES,                       // Describes that an effect removes a card(s) from the hand (to move them to the Graveyard or to banish them)
    CATEGORY_SUMMON,                       // Describes that an effect Normal Summons a monster(s)
    CATEGORY_SPECIAL_SUMMON,               // Describes that an effect Special Summons a monster(s)
    CATEGORY_TOKEN,                        // Describes that an effect Special Summons a token(s)
    CATEGORY_FLIP,                         // Describes a FLIP effect
    CATEGORY_POSITION,                     // Describes an effect that changes a card's battle position
    CATEGORY_CONTROL,                      // Describes that an effect takes or switches control
    CATEGORY_DISABLE,                      // Describes an effect that negates a card effect (not an effect's activation)
    CATEGORY_DISABLE_SUMMON,               // Describes an effect that negates the summon of a monster
    CATEGORY_DRAW,                         // Describes that a card draws
    CATEGORY_SEARCH,                       // Describes that a card searches
    CATEGORY_EQUIP,                        // Describes that a card equips
    CATEGORY_DAMAGE,                       // Describes that a card deals damage
    CATEGORY_RECOVER,                      // Describes that a card recovers life points
    CATEGORY_ATKCHANGE,                    // Describes that a card changes ATK
    CATEGORY_DEFCHANGE,                    // Describes that a card changes DEF
    CATEGORY_COUNTER,                      // Describes an effect that places Counters
    CATEGORY_COIN,                         // Describes that a card uses a coin
    CATEGORY_DICE,                         // Describes that a card uses a dice
    CATEGORY_LEAVE_GRAVE,                  // Describes an effect that causes a card to leave the Graveyard
    CATEGORY_LVCHANGE,                     // Describes an effect that changes a card's level
    CATEGORY_NEGATE,                       // Describes an effect that negates the activation of an effect
    CATEGORY_ANNOUNCE,                     // Describes an effect that requires declaring a card name
    CATEGORY_FUSION_SUMMON,                // Describes an effect that Fusion Summons
    CATEGORY_TOEXTRA,                      // Describes an effect that sends/return a card to the Extra Deck
    HINT_EVENT,                            // used by the core
    HINT_MESSAGE,                          //
    HINT_SELECTMSG,                        // The message that appears when the given player next selects a card
    HINT_OPSELECTED,                       // The message that appears on screen to tell a player which option their opponent selected
    HINT_EFFECT,                           //
    HINT_RACE,                             // Called when selecting/declaring a monster type
    HINT_ATTRIB,                           // Called when selecting/declaring an attribute
    HINT_CODE,                             // Used with "Booster Draft Duel"
    HINT_NUMBER,                           // Called when a player has to pick/declare a number
    HINT_CARD,                             // Called when you need to display the picture of the card (Trickstar Lycoris)
    HINT_ZONE,                             // To be used when the player selects a zone (e.g. Dai Dance).
    HINT_SKILL,                            // Sets the code of a skill card. If it is called first, the skill is created face-up.
    HINT_SKILL_COVER,                      // Sets the cover and id for a skill card. Cover is  value &amp; 0xffffffff, code is (value&gt;&gt;32) &amp; 0xffffffff. If  it iscalled first, the skill is created face-down.
    HINT_SKILL_FLIP,                       // Changes the position of the skill face-down/face-up, updating the code as well. The code is value&amp;0xffffffff. 0x100000000 is face-up and 0x200000000 is face-down.
    HINT_SKILL_REMOVE,                     //
    CHINT_TURN,                            //
    CHINT_CARD,                            //
    CHINT_RACE,                            //
    CHINT_ATTRIBUTE,                       //
    CHINT_NUMBER,                          //
    CHINT_DESC_ADD,                        //
    CHINT_DESC_REMOVE,                     //
    PHINT_DESC_ADD,                        //
    PHINT_DESC_REMOVE,                     //
    
    // 10 OPCodes
    OPCODE_ADD,                            // Operation of addition, to be used in an AnnounceCard filter.
    OPCODE_SUB,                            // Operation of subtraction, to be used in an AnnounceCard filter.
    OPCODE_MUL,                            // Operation of multiplication, to be used in an AnnounceCard filter.
    OPCODE_DIV,                            // Operation of division, to be used in an AnnounceCard filter.
    OPCODE_AND,                            // Operation of logical AND, to be used in an AnnounceCard filter.
    OPCODE_OR,                             // Operation of logical OR, to be used in an AnnounceCard filter.
    OPCODE_NEG,                            // Operation of bitwise negation, to be used in an AnnounceCard filter.
    OPCODE_NOT,                            // Operation of changing sign (+/-), to be used in an AnnounceCard filter.
    OPCODE_BAND,                           //
    OPCODE_BOR,                            //
    OPCODE_BNOT,                           //
    OPCODE_BXOR,                           //
    OPCODE_LSHIFT,                         //
    OPCODE_RSHIFT,                         //
    OPCODE_ALLOW_ALIASES,                  //
    OPCODE_ALLOW_TOKENS,                   //
    OPCODE_ISCODE,                         // Operation of the function Card.IsCode, to be used in an AnnounceCard filter.
    OPCODE_ISSETCARD,                      // Operation of the function Card.IsSetCard, to be used in an AnnounceCard filter.
    OPCODE_ISTYPE,                         // Operation of the function Card.IsType, to be used in an AnnounceCard filter.
    OPCODE_ISRACE,                         // Operation of the function Card.IsRace, to be used in an AnnounceCard filter.
    OPCODE_ISATTRIBUTE,                    // Operation of the function Card.IsAttribute, to be used in an AnnounceCard filter.
    OPCODE_GETCODE,                        // Operation of the function Card.GetCode, to be used in an AnnounceCard filter.
    OPCODE_GETSETCARD,                     // Operation of the function Card.GetSetCard, to be used in an AnnounceCard filter.
    OPCODE_GETTYPE,                        // Operation of the function Card.GetType, to be used in an AnnounceCard filter.
    OPCODE_GETRACE,                        // Operation of the function Card.GetRace, to be used in an AnnounceCard filter.
    OPCODE_GETATTRIBUTE,                   // Operation of the function Card.GetAttribute, to be used in an AnnounceCard filter.
    
    // 11 Hint messages
    HINTMSG_RELEASE,                       // Shows the following hint message: "Select the card(s) to tribute"
    HINTMSG_DISCARD,                       // Shows the following hint message: "Select the card(s) to discard"
    HINTMSG_DESTROY,                       // Shows the following hint message: "Select the card(s) to destroy"
    HINTMSG_REMOVE,                        // Shows the following hint message: "Select the card(s) to banish"
    HINTMSG_TOGRAVE,                       // Shows the following hint message: "Select the card(s) to send to Graveyard"
    HINTMSG_RTOHAND,                       // Shows the following hint message: "Select the card(s) to return to hand"
    HINTMSG_ATOHAND,                       // Shows the following hint message: "Select the card(s) to add to your hand"
    HINTMSG_TODECK,                        // Shows the following hint message: "Select the card(s) to return to Deck"
    HINTMSG_SUMMON,                        // Shows the following hint message: "Select the card(s) to Normal Summon"
    HINTMSG_SPSUMMON,                      // Shows the following hint message: "Select the card(s) to Special Summon"
    HINTMSG_SET,                           // Shows the following hint message: "Select the card(s) to Set to the field"
    HINTMSG_FMATERIAL,                     // Shows the following hint message: "Select the card(s) to use as Fusion Material"
    HINTMSG_SMATERIAL,                     // Shows the following hint message: "Select the card(s) to use as Synchro Material"
    HINTMSG_XMATERIAL,                     // Shows the following hint message: "Select the card(s) to use as Xyz Material"
    HINTMSG_FACEUP,                        // Shows the following hint message: "Select a face-up card(s)"
    HINTMSG_FACEDOWN,                      // Shows the following hint message: "Select a face-down card(s)"
    HINTMSG_ATTACK,                        // Shows the following hint message: "Select a monster(s) in Attack Position"
    HINTMSG_DEFENSE,                       // Shows the following hint message: "Select a monster(s) in Defense Position"
    HINTMSG_EQUIP,                         // Shows the following hint message: "Select a card(s) to equip"
    HINTMSG_REMOVEXYZ,                     // Shows the following hint message: "Select the Xyz Material(s) to detach"
    HINTMSG_CONTROL,                       // Shows the following hint message: "Select the monster(s) to change control"
    HINTMSG_DESREPLACE,                    // Shows the following hint message: "Select the card(s) to replace"
    HINTMSG_FACEUPATTACK,                  // Shows the following hint message: "Select a face-up Attack Position monster(s)"
    HINTMSG_FACEUPDEFENSE,                 // Shows the following hint message: "Select a face-up Defense Position monster(s)"
    HINTMSG_FACEDOWNATTACK,                // Shows the following hint message: "Select a face-down Attack Position monster(s)"
    HINTMSG_FACEDOWNDEFENSE,               // Shows the following hint message: "Select a face-down Defense Position monster(s)"
    HINTMSG_CONFIRM,                       // Shows the following hint message: "Select the card(s) to reveal"
    HINTMSG_TOFIELD,                       // Shows the following hint message: "Select the card(s) to place on the field"
    HINTMSG_POSCHANGE,                     // Shows the following hint message: "Select a monster to change its battle position"
    HINTMSG_SELF,                          // Shows the following hint message: "Select your card"
    HINTMSG_OPPO,                          // Shows the following hint message: "Select an opponent's card"
    HINTMSG_TRIBUTE,                       // Shows the following hint message: "Select monsters for Tribute Summon"
    HINTMSG_DEATTACHFROM,                  // Shows the following hint message: "Select the monster(s) to detach Xyz Material(s) from"
    HINTMSG_LMATERIAL,                     // Shows the following hint message: "Select the card(s) to use as Link Material"
    HINTMSG_ATTACKTARGET,                  // Shows the following hint message: "Select an attack target"
    HINTMSG_EFFECT,                        // Shows the following hint message: "Select the effect you want to activate"
    HINTMSG_TARGET,                        // Shows the following hint message: "Select the target(s) of the effect"
    HINTMSG_COIN,                          // Shows the following hint message: "Select heads or tails"
    HINTMSG_DICE,                          // Shows the following hint message: "Select dice results"
    HINTMSG_CARDTYPE,                      // Shows the following hint message: "Declare 1 card type"
    HINTMSG_OPTION,                        // Shows the following hint message: "Select an option"
    HINTMSG_RESOLVEEFFECT,                 // Shows the following hint message: "Select effect to apply/resolve"
    HINTMSG_SELECT,                        // Shows the following hint message: "Select"
    HINTMSG_POSITION,                      // Shows the following hint message: "Select the battle position"
    HINTMSG_ATTRIBUTE,                     // Shows the following hint message: "Declare an Attribute"
    HINTMSG_RACE,                          // Shows the following hint message: "Declare a Type"
    HINTMSG_CODE,                          // Shows the following hint message: "Declare a card name"
    HINTMSG_NUMBER,                        // Shows the following hint message: "Declare a number"
    HINTMSG_EFFACTIVATE,                   // Shows the following hint message: "Select the effect to activate"
    HINTMSG_LVRANK,                        // Shows the following hint message: "Declare a Level/Rank"
    HINTMSG_RESOLVECARD,                   // Shows the following hint message: "Select a card to resolve"
    HINTMSG_ZONE,                          // Shows the following hint message: "Select the zone to place "card name""
    HINTMSG_DISABLEZONE,                   // Shows the following hint message: "Select the zone(s) to become unusable"
    HINTMSG_TOZONE,                        // Shows the following hint message: "Select the zone to move the card to"
    HINTMSG_COUNTER,                       // Shows the following hint message: "Select the card(s) to place a counter on"
    HINTMSG_NEGATE,                        // Shows the following hint message: "Select the card(s) to negate its effects"
    HINTMSG_ATKDEF,                        // Shows the following hint message: "Select the card(s) to change its ATK/DEF"
    HINTMSG_APPLYTO,                       // Shows the following hint message: "Select the card(s) to apply the effect to"
    HINTMSG_ATTACH,                        // Shows the following hint message: "Select the card(s) to attach as material"
    
    // 12 Effect timings
    TIMING_DRAW_PHASE,                     // During the Draw Phase
    TIMING_STANDBY_PHASE,                  // During the Standby Phase
    TIMING_MAIN_END,                       // When the Main Phase is about to end, while moving to the Battle/End phase
    TIMING_BATTLE_START,                   // When the Battle Phase has just started
    TIMING_BATTLE_END,                     // When the Battle Phase is about to end, while moving to the Main Phase 2/End Phase
    TIMING_END_PHASE,                      // During the End Phase of a turn
    TIMING_SUMMON,                         // When a monster is Summoned
    TIMING_SPSUMMON,                       // When a monster is Special Summoned
    TIMING_FLIPSUMMON,                     // When a monster is Flip Summoned
    TIMING_MSET,                           // When a monster is Set
    TIMING_SSET,                           // When a Spell/Trap is Set
    TIMING_POS_CHANGE,                     // When a position changes
    TIMING_ATTACK,                         // When an attack is declared
    TIMING_DAMAGE_STEP,                    // During the Damage Step
    TIMING_DAMAGE_CAL,                     // When performing Damage Calculation
    TIMING_CHAIN_END,                      // When a chain ends
    TIMING_DRAW,                           // When someplayer draws (not only in the Draw Phase)
    TIMING_DAMAGE,                         // When a player takes damage
    TIMING_RECOVER,                        // When a player gains LP
    TIMING_DESTROY,                        // When something is destroyed
    TIMING_REMOVE,                         // This event is raised when a card is removed
    TIMING_TOHAND,                         // When you add a hand (retrieve, recycle, etc.)
    TIMING_TODECK,                         // This event is raised when a card is sent to the deck
    TIMING_TOGRAVE,                        // This event is raised when a card is sent to the graveyard
    TIMING_BATTLE_PHASE,                   // During the Battle Phase
    TIMING_EQUIP,                          // This event is raised when a card is equipped to another
    TIMING_BATTLE_STEP_END,                // When the steps in a battle have finished
    TIMING_BATTLED,                        //
    TIMINGS_CHECK_MONSTER,                 // When a monster is placed on te field
    TIMINGS_CHECK_MONSTER_E,               // When a monster is placed on the field and also during the End Phase
    
    // 13 Global flgas
    GLOBALFLAG_DECK_REVERSE_CHECK,         // This flags is required to use EFFECT_REVERSE_DECK
    GLOBALFLAG_BRAINWASHING_CHECK,         // This flags is used with Removing Brainshwashing
    GLOBALFLAG_DELAYED_QUICKEFFECT,        // N/A
    GLOBALFLAG_DETACH_EVENT,               // This flag is required when using EVENT_DETACH_MATERIAL
    GLOBALFLAG_SPSUMMON_COUNT,             // A flag related with a limit a player can attempt Special Summons. Used with El Shaddoll Winda
    GLOBALFLAG_XMAT_COUNT_LIMIT,           // Allows EFFECT_TYPE_XMATERIAL to take SetCountLimit into account
    GLOBALFLAG_SELF_TOGRAVE,               // Allows checking the Graveyard in the middle of a resolving chain. Flag required to use EFFECT_SELF_TOGRAVE
    GLOBALFLAG_SPSUMMON_ONCE,              // Cards that can only be special Summoned once per turn. This flga is related to Card.SetSPSummonOnce ()
    
    // 14 SetCountLimit codes
    EFFECT_COUNT_CODE_OATH,                // A flag to be used with SetCountLimit. An effect that receives this can only be ACTIVATED a given number of times (activations that are negated do not count)
    EFFECT_COUNT_CODE_DUEL,                // A flag to be used with SetCountLimit. The effect that receives this flag can only be used a given amount of times per duel.
    EFFECT_COUNT_CODE_SINGLE,              // A flag to be used with SetCountLimit. Usually used with multiple effects of the same card, the value set is the maximum count among all those effects. Example: "Once per turn: You can activate 1 of these effects."
    EFFECT_COUNT_CODE_CHAIN,               // A flag to be used with SetCountLimit. Can be used when the effect should only be activatable once per chain (per copy of the card)
    
    // 15 Duel mode flags
    DUEL_TEST_MODE,                        // A flag for duel modes. You can control the AI/Opponent
    DUEL_ATTACK_FIRST_TURN,                // A flag for duel modes. You can attack on the first turn
    DUEL_USE_TRAPS_IN_NEW_CHAIN,           // A flag for duel modes. Deprecated flag in Edopro's 8.0 core
    DUEL_OBSOLETE_RULING,                  // A flag for duel modes. Applies First turn draw and ignition priority
    DUEL_PSEUDO_SHUFFLE,                   // A flag for duel modes. The deck is not shuffled
    DUEL_TRIGGER_WHEN_PRIVATE_KNOWLEDGE,   // -
    DUEL_SIMPLE_AI,                        // A flag for duel modes. The AI/Opponent will activate effects whenever prompted
    DUEL_RELAY,                            //
    DUEL_OBSOLETE_IGNITION,                //
    DUEL_1ST_TURN_DRAW,                    //
    DUEL_1_FIELD,                          // Use this constant name in the scripts (internally called DUEL_1_FACEUP_FIELD)
    DUEL_PZONE,                            //
    DUEL_SEPARATE_PZONE,                   //
    DUEL_EMZONE,                           //
    DUEL_FSX_MMZONE,                       //
    DUEL_TRAP_MONSTERS_NOT_USE_ZONE,       //
    DUEL_RETURN_TO_DECK_TRIGGERS,          //
    DUEL_TRIGGER_ONLY_IN_LOCATION,         //
    DUEL_SPSUMMON_ONCE_OLD_NEGATE,         //
    DUEL_CANNOT_SUMMON_OATH_OLD,           //
    DUEL_NO_STANDBY_PHASE,                 //
    DUEL_NO_MAIN_PHASE_2,                  //
    DUEL_3_COLUMNS_FIELD,                  //
    DUEL_DRAW_UNTIL_5,                     //
    DUEL_NO_HAND_LIMIT,                    //
    DUEL_UNLIMITED_SUMMONS,                //
    DUEL_INVERTED_QUICK_PRIORITY,          //
    DUEL_EQUIP_NOT_SENT_IF_MISSING_TARGET, //
    DUEL_0_ATK_DESTROYED,                  //
    DUEL_STORE_ATTACK_REPLAYS,             //
    DUEL_SINGLE_CHAIN_IN_DAMAGE_SUBSTEP,   //
    DUEL_CAN_REPOS_IF_NON_SUMPLAYER,       //
    DUEL_TCG_SEGOC_NONPUBLIC,              //
    DUEL_TCG_SEGOC_FIRSTTRIGGER,           //
    DUEL_MODE_SPEED,                       // A composite flag for duel modes. (DUEL_3_COLUMNS_FIELD+DUEL_NO_MAIN_PHASE_2+DUEL_TRIGGER_ONLY_IN_LOCATION)
    DUEL_MODE_RUSH,                        // A composite flag for duel modes. (DUEL_3_COLUMNS_FIELD+DUEL_NO_MAIN_PHASE_2+DUEL_NO_STANDBY_PHASE+DUEL_1ST_TURN_DRAW+DUEL_INVERTED_QUICK_PRIORITY+DUEL_DRAW_UNTIL_5+DUEL_NO_HAND_LIMIT+DUEL_UNLIMITED_SUMMONS+DUEL_TRIGGER_ONLY_IN_LOCATION)
    DUEL_MODE_GOAT,                        // A composite flag for duel modes.  (DUEL_MODE_MR1
    DUEL_MODE_MR1,                         // A composite flag for duel modes. (DUEL_OBSOLETE_IGNITION+DUEL_1ST_TURN_DRAW+DUEL_1_FIELD+DUEL_SPSUMMON_ONCE_OLD_NEGATE+DUEL_RETURN_TO_DECK_TRIGGERS+DUEL_CANNOT_SUMMON_OATH_OLD)
    DUEL_MODE_MR2,                         // A composite flag for duel modes. (DUEL_1ST_TURN_DRAW+DUEL_1_FIELD+DUEL_SPSUMMON_ONCE_OLD_NEGATE+DUEL_RETURN_TO_DECK_TRIGGERS+DUEL_CANNOT_SUMMON_OATH_OLD)
    DUEL_MODE_MR3,                         // A composite flag for duel modes. (DUEL_PZONE+DUEL_SEPARATE_PZONE+DUEL_SPSUMMON_ONCE_OLD_NEGATE+DUEL_RETURN_TO_DECK_TRIGGERS+DUEL_CANNOT_SUMMON_OATH_OLD)
    DUEL_MODE_MR4,                         // A composite flag for duel modes. (DUEL_PZONE+DUEL_EMZONE+DUEL_SPSUMMON_ONCE_OLD_NEGATE+DUEL_RETURN_TO_DECK_TRIGGERS+DUEL_CANNOT_SUMMON_OATH_OLD)
    DUEL_MODE_MR5,                         // A composite flag for duel modes. (DUEL_PZONE+DUEL_EMZONE+DUEL_FSX_MMZONE+DUEL_TRAP_MONSTERS_NOT_USE_ZONE+DUEL_TRIGGER_ONLY_IN_LOCATION)
    
    // 16 Activities
    ACTIVITY_SUMMON,                       // Refers to the action of attempting to perform Summons of any kind
    ACTIVITY_NORMALSUMMON,                 // Refers to the action of performing a Normal Summon
    ACTIVITY_SPSUMMON,                     // Refers to the action of performing Special Summons
    ACTIVITY_FLIPSUMMON,                   // Refers to the action of performing Flip Summons
    ACTIVITY_ATTACK,                       // Refers to the action of declarion attacks
    ACTIVITY_BATTLE_PHASE,                 // Refers to the act of conducting a battle phase. This activity is not available with custom counter
    ACTIVITY_CHAIN,                        // An activity only available with custom counter
    
    // 17 Win reasons
    WIN_REASON_EXODIA,                     // The hexadecimal value for a duel win caused by "Exodia, the Forbidden One"
    WIN_REASON_FINAL_COUNTDOWN,            // The hexadecimal value for a duel win caused by "Countdown"
    WIN_REASON_VENNOMINAGA,                // The hexadecimal value for a duel win caused by "Vennominage, Deity of the Poisonous Snakes"
    WIN_REASON_CREATORGOD,                 // The hexadecimal value for a duel win caused by "Holactie the Creator of Light"
    WIN_REASON_EXODIUS,                    // The hexadecimal value for a duel win caused by "Exodius the Ultimate Forbidden Lord"
    WIN_REASON_DESTINY_BOARD,              // The hexadecimal value for a duel win caused by "Destiny Board"
    WIN_REASON_LAST_TURN,                  // The hexadecimal value for a duel win caused by "Last Turn"
    WIN_REASON_PUPPET_LEO,                 // The hexadecimal value for a duel win caused by "Number 88: Gimmick Puppet of Leo"
    WIN_REASON_DISASTER_LEO,               // The hexadecimal value for a duel win caused by "Number C88: Gimmick Puppet Disaster Leo"
    WIN_REASON_JACKPOT7,                   // The hexadecimal value for a duel win caused by "Jackpot 7"
    WIN_REASON_RELAY_SOUL,                 // The hexadecimal value for a duel win caused by "Relay Soul"
    WIN_REASON_GHOSTRICK_MISCHIEF,         // The hexadecimal value for a duel win caused by "Ghostrick Angel of Mischief"
    WIN_REASON_PHANTASM_SPIRAL,            // The hexadecimal value for a duel win caused by "Phantasm Spiral Assault"
    WIN_REASON_FA_WINNERS,                 // The hexadecimal value for a duel win caused by "F.A. Winners"
    WIN_REASON_FLYING_ELEPHANT,            // The hexadecimal value for a duel win caused by "Flying Elephant"
    WIN_REASON_EXODIA_DEFENDER,            // The hexadecimal value for a duel win caused by "Exodia, the Legendary Defender"
    WIN_REASON_MATCH_WINNER,               // Not used by cards.
    WIN_REASON_TRUE_EXODIA,                // The hexadecimal value for a duel win caused by "True Exodia"
    WIN_REASON_FINAL_DRAW,                 // The hexadecimal value for a duel win caused by "Final Draw"
    WIN_REASON_CREATOR_MIRACLE,            // The hexadecimal value for a duel win caused by "Creator of Miracles"
    WIN_REASON_EVIL_1,                     // Not used by cards.
    WIN_REASON_NUMBER_Ci1000,              // The hexadecimal value for a duel win caused by "Number iC1000: Numeronius Numeronia"
    WIN_REASON_ZERO_GATE,                  // The hexadecimal value for a duel win caused by "Zero Gate of the Void"
    WIN_REASON_DEUCE,                      // The hexadecimal value for a duel win caused by "Number iC1000: Numeronius Numeronia"
    WIN_REASON_DECK_MASTER,                // The hexadecimal value for a duel win caused by the rules of Deck Masters
    WIN_REASON_DRAW_OF_FATE,               // The hexadecimal value for a duel win caused by "Draw of Fate"
    WIN_REASON_MUSICAL_SUMO,               // The hexadecimal value for a duel win caused by "Musical Sumo Dice Games"
    
    // 18 Other constants
    ANNOUNCE_CARD,                         // Declaration card
    ANNOUNCE_CARD_FILTER,                  // Declaration card with filters
    REGISTER_FLAG_DETACH_XMAT,             // Effect that activates with cost of detaching own Xyz material, for Tachyon Unit (Card.RegisterEffect)
    REGISTER_FLAG_CARDIAN,                 // Cardian's effects to Special Summon a Cardian, for anime Cardians (Card.RegisterEffect)
    REGISTER_FLAG_THUNDRA,                 // Thunders Dragon monster's effects that activates by discarding themselves, for Thunder Dragon Thunderstormech (Card.RegisterEffect)
    REGISTER_FLAG_ALLURE_LVUP,             // Allure Queen's effect to Special Summon the next level, for Allure Palace (Card.RegisterEffect)
    REGISTER_FLAG_TELLAR,                  // An effect registered with this flag will be available to be applied by Tellarknight Constellar Caduceus
    FUSPROC_NOTFUSION,                     // Flag used for the various filters in the fusion procedure.
    FUSPROC_CONTACTFUS,                    // Flag used for the various filters in the fusion procedure.
    FUSPROC_LISTEDMATS,                    // Flag used for the various filters in the fusion procedure.
    FUSPROC_NOLIMIT,                       //
    FUSPROC_CANCELABLE,                    // Flag used in the fusion procedure. Allows the selection of fusion materials to be canceled
    RITPROC_EQUAL,                         // Flag used for the type of Ritual Summon procedure
    RITPROC_GREATER,                       // Flag used for the type of Ritual Summon procedure
    MATERIAL_FUSION,                       // Value= 0x1&lt;&lt;32
    MATERIAL_SYNCHRO,                      // Value= 0x2&lt;&lt;32
    MATERIAL_XYZ,                          // Value= 0x4&lt;&lt;32
    MATERIAL_LINK,                         // Value= 0x8&lt;&lt;32
    EFFECT_CLIENT_MODE_NORMAL,             //
    EFFECT_CLIENT_MODE_RESOLVE,            //
    EFFECT_CLIENT_MODE_RESET,              //
    DOUBLE_DAMAGE,                         // Double piercing damage, used as the value of EFFECT_PIERCE
    HALF_DAMAGE,                           // Half piercing damage, used as the value of EFFECT_PIERCE
    SELECT_HEADS,                          // Display "Heads". Used as description when an effect required the player to select heads/tails
    SELECT_TAILS,                          // Display "Tails". Used as description when an effect required the player to select heads/tails
    
}
export type LOCATION_KIND =
    | Constants.LOCATION_DECK
    | Constants.LOCATION_HAND
    | Constants.LOCATION_MZONE
    | Constants.LOCATION_SZONE
    | Constants.LOCATION_GRAVE
    | Constants.LOCATION_REMOVED
    | Constants.LOCATION_EXTRA
    | Constants.LOCATION_OVERLAY
    | Constants.LOCATION_ONFIELD
    | Constants.LOCATION_PUBLIC
    | Constants.LOCATION_ALL
    | Constants.LOCATION_DECKBOT
    | Constants.LOCATION_DECKSHF
    | Constants.LOCATION_FZONE
    | Constants.LOCATION_PZONE
    | Constants.LOCATION_STZONE
    | Constants.LOCATION_MMZONE
    | Constants.LOCATION_EMZONE

export type ZONES_KIND =
    | Constants.ZONES_MMZ
    | Constants.ZONES_EMZ

export type SEQ_KIND =
    | Constants.SEQ_DECKTOP
    | Constants.SEQ_DECKBOTTOM
    | Constants.SEQ_DECKSHUFFLE

export type TYPE_KIND =
    | Constants.TYPE_MONSTER
    | Constants.TYPE_SPELL
    | Constants.TYPE_TRAP
    | Constants.TYPE_NORMAL
    | Constants.TYPE_EFFECT
    | Constants.TYPE_FUSION
    | Constants.TYPE_RITUAL
    | Constants.TYPE_TRAPMONSTER
    | Constants.TYPE_SPIRIT
    | Constants.TYPE_UNION
    | Constants.TYPE_GEMINI
    | Constants.TYPE_TUNER
    | Constants.TYPE_SYNCHRO
    | Constants.TYPE_TOKEN
    | Constants.TYPE_MAXIMUM
    | Constants.TYPE_QUICKPLAY
    | Constants.TYPE_CONTINUOUS
    | Constants.TYPE_EQUIP
    | Constants.TYPE_FIELD
    | Constants.TYPE_COUNTER
    | Constants.TYPE_FLIP
    | Constants.TYPE_TOON
    | Constants.TYPE_XYZ
    | Constants.TYPE_PENDULUM
    | Constants.TYPE_SPSUMMON
    | Constants.TYPE_LINK
    | Constants.TYPE_SKILL
    | Constants.TYPE_ACTION
    | Constants.TYPES_TOKEN
    | Constants.TYPE_EXTRA
    | Constants.TYPE_PLUS
    | Constants.TYPE_MINUS
    | Constants.TYPE_ARMOR

export type ATTRIBUTE_KIND =
    | Constants.ATTRIBUTE_EARTH
    | Constants.ATTRIBUTE_WATER
    | Constants.ATTRIBUTE_FIRE
    | Constants.ATTRIBUTE_WIND
    | Constants.ATTRIBUTE_LIGHT
    | Constants.ATTRIBUTE_DARK
    | Constants.ATTRIBUTE_DIVINE
    | Constants.ATTRIBUTE_LAUGH
    | Constants.ATTRIBUTE_ALL

export type RACE_KIND =
    | Constants.RACE_ALL
    | Constants.RACE_WARRIOR
    | Constants.RACE_SPELLCASTER
    | Constants.RACE_FAIRY
    | Constants.RACE_FIEND
    | Constants.RACE_ZOMBIE
    | Constants.RACE_MACHINE
    | Constants.RACE_AQUA
    | Constants.RACE_PYRO
    | Constants.RACE_ROCK
    | Constants.RACE_WINGEDBEAST
    | Constants.RACE_PLANT
    | Constants.RACE_INSECT
    | Constants.RACE_THUNDER
    | Constants.RACE_DRAGON
    | Constants.RACE_BEAST
    | Constants.RACE_BEASTWARRIOR
    | Constants.RACE_DINOSAUR
    | Constants.RACE_FISH
    | Constants.RACE_SEASERPENT
    | Constants.RACE_REPTILE
    | Constants.RACE_PSYCHIC
    | Constants.RACE_DIVINE
    | Constants.RACE_CREATORGOD
    | Constants.RACE_WYRM
    | Constants.RACE_CYBERSE
    | Constants.RACE_ILLUSION
    | Constants.RACE_CYBORG
    | Constants.RACE_MAGICALKNIGHT
    | Constants.RACE_HIGHDRAGON
    | Constants.RACE_OMEGAPSYCHIC
    | Constants.RACE_CELESTIALWARRIOR
    | Constants.RACE_GALAXY
    | Constants.RACE_YOKAI
    | Constants.RACES_BEAST_BWARRIOR_WINGB

export type REASON_KIND =
    | Constants.REASON_DESTROY
    | Constants.REASON_RELEASE
    | Constants.REASON_TEMPORARY
    | Constants.REASON_MATERIAL
    | Constants.REASON_SUMMON
    | Constants.REASON_BATTLE
    | Constants.REASON_EFFECT
    | Constants.REASON_COST
    | Constants.REASON_ADJUST
    | Constants.REASON_LOST_TARGET
    | Constants.REASON_RULE
    | Constants.REASON_SPSUMMON
    | Constants.REASON_DISSUMMON
    | Constants.REASON_FLIP
    | Constants.REASON_DISCARD
    | Constants.REASON_RDAMAGE
    | Constants.REASON_RRECOVER
    | Constants.REASON_RETURN
    | Constants.REASON_FUSION
    | Constants.REASON_SYNCHRO
    | Constants.REASON_RITUAL
    | Constants.REASON_XYZ
    | Constants.REASON_REPLACE
    | Constants.REASON_DRAW
    | Constants.REASON_REDIRECT
    | Constants.REASON_REVEAL
    | Constants.REASON_LINK

export type LOCATION_REASON_KIND =
    | Constants.LOCATION_REASON_TOFIELD
    | Constants.LOCATION_REASON_CONTROL
    | Constants.LOCATION_REASON_COUNT

export type SUMMON_TYPE_KIND =
    | Constants.SUMMON_TYPE_NORMAL
    | Constants.SUMMON_TYPE_ADVANCE
    | Constants.SUMMON_TYPE_GEMINI
    | Constants.SUMMON_TYPE_FLIP
    | Constants.SUMMON_TYPE_SPECIAL
    | Constants.SUMMON_TYPE_FUSION
    | Constants.SUMMON_TYPE_RITUAL
    | Constants.SUMMON_TYPE_SYNCHRO
    | Constants.SUMMON_TYPE_XYZ
    | Constants.SUMMON_TYPE_PENDULUM
    | Constants.SUMMON_TYPE_LINK
    | Constants.SUMMON_TYPE_MAXIMUM

export type STATUS_KIND =
    | Constants.STATUS_DISABLED
    | Constants.STATUS_TO_ENABLE
    | Constants.STATUS_TO_DISABLE
    | Constants.STATUS_PROC_COMPLETE
    | Constants.STATUS_SET_TURN
    | Constants.STATUS_NO_LEVEL
    | Constants.STATUS_BATTLE_RESULT
    | Constants.STATUS_SPSUMMON_STEP
    | Constants.STATUS_FORM_CHANGED
    | Constants.STATUS_SUMMONING
    | Constants.STATUS_EFFECT_ENABLED
    | Constants.STATUS_SUMMON_TURN
    | Constants.STATUS_DESTROY_CONFIRMED
    | Constants.STATUS_LEAVE_CONFIRMED
    | Constants.STATUS_BATTLE_DESTROYED
    | Constants.STATUS_COPYING_EFFECT
    | Constants.STATUS_CHAINING
    | Constants.STATUS_SUMMON_DISABLED
    | Constants.STATUS_ACTIVATE_DISABLED
    | Constants.STATUS_EFFECT_REPLACED
    | Constants.STATUS_FUTURE_FUSION
    | Constants.STATUS_ATTACK_CANCELED
    | Constants.STATUS_INITIALIZING
    | Constants.STATUS_JUST_POS
    | Constants.STATUS_CONTINUOUS_POS
    | Constants.STATUS_FORBIDDEN
    | Constants.STATUS_ACT_FROM_HAND
    | Constants.STATUS_OPPO_BATTLE
    | Constants.STATUS_FLIP_SUMMON_TURN
    | Constants.STATUS_SPSUMMON_TURN

export type ASSUME_KIND =
    | Constants.ASSUME_CODE
    | Constants.ASSUME_TYPE
    | Constants.ASSUME_LEVEL
    | Constants.ASSUME_RANK
    | Constants.ASSUME_ATTRIBUTE
    | Constants.ASSUME_RACE
    | Constants.ASSUME_ATTACK
    | Constants.ASSUME_DEFENSE
    | Constants.ASSUME_LINK
    | Constants.ASSUME_LINKMARKER

export type LINK_MARKER_KIND =
    | Constants.LINK_MARKER_BOTTOM_LEFT
    | Constants.LINK_MARKER_BOTTOM
    | Constants.LINK_MARKER_BOTTOM_RIGHT
    | Constants.LINK_MARKER_LEFT
    | Constants.LINK_MARKER_RIGHT
    | Constants.LINK_MARKER_TOP_LEFT
    | Constants.LINK_MARKER_TOP
    | Constants.LINK_MARKER_TOP_RIGHT

export type COUNTER_KIND =
    | Constants.COUNTER_WITHOUT_PERMIT
    | Constants.COUNTER_NEED_ENABLE

export type PHASE_KIND =
    | Constants.PHASE_DRAW
    | Constants.PHASE_STANDBY
    | Constants.PHASE_MAIN1
    | Constants.PHASE_BATTLE_START
    | Constants.PHASE_BATTLE_STEP
    | Constants.PHASE_DAMAGE
    | Constants.PHASE_DAMAGE_CAL
    | Constants.PHASE_BATTLE
    | Constants.PHASE_MAIN2
    | Constants.PHASE_END

export type PLAYER_KIND =
    | Constants.PLAYER_NONE
    | Constants.PLAYER_ALL
    | Constants.PLAYER_EITHER

export type CHAININFO_KIND =
    | Constants.CHAININFO_CHAIN_COUNT
    | Constants.CHAININFO_TRIGGERING_EFFECT
    | Constants.CHAININFO_TRIGGERING_PLAYER
    | Constants.CHAININFO_TRIGGERING_CONTROLER
    | Constants.CHAININFO_TRIGGERING_LOCATION
    | Constants.CHAININFO_TRIGGERING_LOCATION_SYMBOLIC
    | Constants.CHAININFO_TRIGGERING_SEQUENCE
    | Constants.CHAININFO_TRIGGERING_SEQUENCE_SYMBOLIC
    | Constants.CHAININFO_TARGET_CARDS
    | Constants.CHAININFO_TARGET_PLAYER
    | Constants.CHAININFO_TARGET_PARAM
    | Constants.CHAININFO_DISABLE_REASON
    | Constants.CHAININFO_DISABLE_PLAYER
    | Constants.CHAININFO_CHAIN_ID
    | Constants.CHAININFO_TYPE
    | Constants.CHAININFO_EXTTYPE
    | Constants.CHAININFO_TRIGGERING_POSITION
    | Constants.CHAININFO_TRIGGERING_CODE
    | Constants.CHAININFO_TRIGGERING_CODE2
    | Constants.CHAININFO_TRIGGERING_LEVEL
    | Constants.CHAININFO_TRIGGERING_RANK
    | Constants.CHAININFO_TRIGGERING_ATTRIBUTE
    | Constants.CHAININFO_TRIGGERING_RACE
    | Constants.CHAININFO_TRIGGERING_ATTACK
    | Constants.CHAININFO_TRIGGERING_DEFENSE

export type RESET_KIND =
    | Constants.RESET_EVENT
    | Constants.RESET_CARD
    | Constants.RESET_CODE
    | Constants.RESET_COPY
    | Constants.RESET_DISABLE
    | Constants.RESET_TURN_SET
    | Constants.RESET_TOGRAVE
    | Constants.RESET_REMOVE
    | Constants.RESET_TEMP_REMOVE
    | Constants.RESET_TOHAND
    | Constants.RESET_TODECK
    | Constants.RESET_LEAVE
    | Constants.RESET_TOFIELD
    | Constants.RESET_CONTROL
    | Constants.RESET_OVERLAY
    | Constants.RESET_MSCHANGE
    | Constants.RESET_SELF_TURN
    | Constants.RESET_OPPO_TURN
    | Constants.RESET_PHASE
    | Constants.RESET_CHAIN
    | Constants.RESETS_STANDARD
    | Constants.RESETS_STANDARD_DISABLE
    | Constants.RESETS_REDIRECT
    | Constants.RESETS_CANNOT_ACT
    | Constants.RESETS_STANDARD_EXC_GRAVE

export type EFFECT_TYPE_KIND =
    | Constants.EFFECT_TYPE_SINGLE
    | Constants.EFFECT_TYPE_FIELD
    | Constants.EFFECT_TYPE_EQUIP
    | Constants.EFFECT_TYPE_ACTIONS
    | Constants.EFFECT_TYPE_ACTIVATE
    | Constants.EFFECT_TYPE_FLIP
    | Constants.EFFECT_TYPE_IGNITION
    | Constants.EFFECT_TYPE_TRIGGER_O
    | Constants.EFFECT_TYPE_QUICK_O
    | Constants.EFFECT_TYPE_TRIGGER_F
    | Constants.EFFECT_TYPE_QUICK_F
    | Constants.EFFECT_TYPE_CONTINUOUS
    | Constants.EFFECT_TYPE_XMATERIAL
    | Constants.EFFECT_TYPE_GRANT
    | Constants.EFFECT_TYPE_TARGET

export type EFFECT_FLAG_KIND =
    | Constants.EFFECT_FLAG_INITIAL
    | Constants.EFFECT_FLAG_FUNC_VALUE
    | Constants.EFFECT_FLAG_COUNT_LIMIT
    | Constants.EFFECT_FLAG_FIELD_ONLY
    | Constants.EFFECT_FLAG_CARD_TARGET
    | Constants.EFFECT_FLAG_IGNORE_RANGE
    | Constants.EFFECT_FLAG_ABSOLUTE_TARGET
    | Constants.EFFECT_FLAG_IGNORE_IMMUNE
    | Constants.EFFECT_FLAG_SET_AVAILABLE
    | Constants.EFFECT_FLAG_CANNOT_NEGATE
    | Constants.EFFECT_FLAG_CANNOT_DISABLE
    | Constants.EFFECT_FLAG_PLAYER_TARGET
    | Constants.EFFECT_FLAG_BOTH_SIDE
    | Constants.EFFECT_FLAG_COPY_INHERIT
    | Constants.EFFECT_FLAG_DAMAGE_STEP
    | Constants.EFFECT_FLAG_DAMAGE_CAL
    | Constants.EFFECT_FLAG_DELAY
    | Constants.EFFECT_FLAG_SINGLE_RANGE
    | Constants.EFFECT_FLAG_UNCOPYABLE
    | Constants.EFFECT_FLAG_OATH
    | Constants.EFFECT_FLAG_SPSUM_PARAM
    | Constants.EFFECT_FLAG_REPEAT
    | Constants.EFFECT_FLAG_NO_TURN_RESET
    | Constants.EFFECT_FLAG_EVENT_PLAYER
    | Constants.EFFECT_FLAG_OWNER_RELATE
    | Constants.EFFECT_FLAG_CANNOT_INACTIVATE
    | Constants.EFFECT_FLAG_CLIENT_HINT
    | Constants.EFFECT_FLAG_CONTINUOUS_TARGET
    | Constants.EFFECT_FLAG_LIMIT_ZONE
    | Constants.EFFECT_FLAG_IMMEDIATELY_APPLY
    | Constants.EFFECT_FLAG2_CONTINUOUS_EQUIP
    | Constants.EFFECT_FLAG2_COF
    | Constants.EFFECT_FLAG2_CHECK_SIMULTANEOUS
    | Constants.EFFECT_FLAG2_FORCE_ACTIVATE_LOCATION
    | Constants.EFFECT_FLAG2_MAJESTIC_MUST_COPY

export type EFFECT_KIND =
    | Constants.EFFECT_IMMUNE_EFFECT
    | Constants.EFFECT_DISABLE
    | Constants.EFFECT_CANNOT_DISABLE
    | Constants.EFFECT_SET_CONTROL
    | Constants.EFFECT_CANNOT_CHANGE_CONTROL
    | Constants.EFFECT_CANNOT_ACTIVATE
    | Constants.EFFECT_CANNOT_TRIGGER
    | Constants.EFFECT_DISABLE_EFFECT
    | Constants.EFFECT_DISABLE_CHAIN
    | Constants.EFFECT_DISABLE_TRAPMONSTER
    | Constants.EFFECT_CANNOT_INACTIVATE
    | Constants.EFFECT_CANNOT_DISEFFECT
    | Constants.EFFECT_CANNOT_CHANGE_POSITION
    | Constants.EFFECT_TRAP_ACT_IN_HAND
    | Constants.EFFECT_TRAP_ACT_IN_SET_TURN
    | Constants.EFFECT_REMAIN_FIELD
    | Constants.EFFECT_MONSTER_SSET
    | Constants.EFFECT_QP_ACT_IN_SET_TURN
    | Constants.EFFECT_CANNOT_SUMMON
    | Constants.EFFECT_CANNOT_FLIP_SUMMON
    | Constants.EFFECT_CANNOT_SPECIAL_SUMMON
    | Constants.EFFECT_CANNOT_MSET
    | Constants.EFFECT_CANNOT_SSET
    | Constants.EFFECT_CANNOT_DRAW
    | Constants.EFFECT_CANNOT_DISABLE_SUMMON
    | Constants.EFFECT_CANNOT_DISABLE_SPSUMMON
    | Constants.EFFECT_SET_SUMMON_COUNT_LIMIT
    | Constants.EFFECT_EXTRA_SUMMON_COUNT
    | Constants.EFFECT_SPSUMMON_CONDITION
    | Constants.EFFECT_REVIVE_LIMIT
    | Constants.EFFECT_SUMMON_PROC
    | Constants.EFFECT_LIMIT_SUMMON_PROC
    | Constants.EFFECT_SPSUMMON_PROC
    | Constants.EFFECT_EXTRA_SET_COUNT
    | Constants.EFFECT_SET_PROC
    | Constants.EFFECT_LIMIT_SET_PROC
    | Constants.EFFECT_LIGHT_OF_INTERVENTION
    | Constants.EFFECT_CANNOT_DISABLE_FLIP_SUMMON
    | Constants.EFFECT_INDESTRUCTABLE
    | Constants.EFFECT_INDESTRUCTABLE_EFFECT
    | Constants.EFFECT_INDESTRUCTABLE_BATTLE
    | Constants.EFFECT_UNRELEASABLE_SUM
    | Constants.EFFECT_UNRELEASABLE_NONSUM
    | Constants.EFFECT_DESTROY_SUBSTITUTE
    | Constants.EFFECT_CANNOT_RELEASE
    | Constants.EFFECT_INDESTRUCTABLE_COUNT
    | Constants.EFFECT_UNRELEASABLE_EFFECT
    | Constants.EFFECT_DESTROY_REPLACE
    | Constants.EFFECT_RELEASE_REPLACE
    | Constants.EFFECT_SEND_REPLACE
    | Constants.EFFECT_CANNOT_DISCARD_HAND
    | Constants.EFFECT_CANNOT_DISCARD_DECK
    | Constants.EFFECT_CANNOT_USE_AS_COST
    | Constants.EFFECT_CANNOT_PLACE_COUNTER
    | Constants.EFFECT_CANNOT_TO_GRAVE_AS_COST
    | Constants.EFFECT_LEAVE_FIELD_REDIRECT
    | Constants.EFFECT_TO_HAND_REDIRECT
    | Constants.EFFECT_TO_DECK_REDIRECT
    | Constants.EFFECT_TO_GRAVE_REDIRECT
    | Constants.EFFECT_REMOVE_REDIRECT
    | Constants.EFFECT_CANNOT_TO_HAND
    | Constants.EFFECT_CANNOT_TO_DECK
    | Constants.EFFECT_CANNOT_REMOVE
    | Constants.EFFECT_CANNOT_TO_GRAVE
    | Constants.EFFECT_CANNOT_TURN_SET
    | Constants.EFFECT_CANNOT_BE_BATTLE_TARGET
    | Constants.EFFECT_CANNOT_BE_EFFECT_TARGET
    | Constants.EFFECT_IGNORE_BATTLE_TARGET
    | Constants.EFFECT_CANNOT_DIRECT_ATTACK
    | Constants.EFFECT_DIRECT_ATTACK
    | Constants.EFFECT_DUAL_STATUS
    | Constants.EFFECT_EQUIP_LIMIT
    | Constants.EFFECT_DUAL_SUMMONABLE
    | Constants.EFFECT_REVERSE_DAMAGE
    | Constants.EFFECT_REVERSE_RECOVER
    | Constants.EFFECT_CHANGE_DAMAGE
    | Constants.EFFECT_REFLECT_DAMAGE
    | Constants.EFFECT_CANNOT_ATTACK
    | Constants.EFFECT_CANNOT_ATTACK_ANNOUNCE
    | Constants.EFFECT_CANNOT_CHANGE_POS_E
    | Constants.EFFECT_ACTIVATE_COST
    | Constants.EFFECT_SUMMON_COST
    | Constants.EFFECT_SPSUMMON_COST
    | Constants.EFFECT_FLIPSUMMON_COST
    | Constants.EFFECT_MSET_COST
    | Constants.EFFECT_SSET_COST
    | Constants.EFFECT_ATTACK_COST
    | Constants.EFFECT_UPDATE_ATTACK
    | Constants.EFFECT_SET_ATTACK
    | Constants.EFFECT_SET_ATTACK_FINAL
    | Constants.EFFECT_SET_BASE_ATTACK
    | Constants.EFFECT_UPDATE_DEFENSE
    | Constants.EFFECT_SET_DEFENSE
    | Constants.EFFECT_SET_DEFENSE_FINAL
    | Constants.EFFECT_SET_BASE_DEFENSE
    | Constants.EFFECT_REVERSE_UPDATE
    | Constants.EFFECT_SWAP_AD
    | Constants.EFFECT_SWAP_BASE_AD
    | Constants.EFFECT_SWAP_ATTACK_FINAL
    | Constants.EFFECT_SWAP_DEFENSE_FINAL
    | Constants.EFFECT_ADD_CODE
    | Constants.EFFECT_CHANGE_CODE
    | Constants.EFFECT_ADD_TYPE
    | Constants.EFFECT_REMOVE_TYPE
    | Constants.EFFECT_CHANGE_TYPE
    | Constants.EFFECT_REMOVE_CODE
    | Constants.EFFECT_ADD_RACE
    | Constants.EFFECT_REMOVE_RACE
    | Constants.EFFECT_CHANGE_RACE
    | Constants.EFFECT_ADD_ATTRIBUTE
    | Constants.EFFECT_REMOVE_ATTRIBUTE
    | Constants.EFFECT_CHANGE_ATTRIBUTE
    | Constants.EFFECT_UPDATE_LEVEL
    | Constants.EFFECT_CHANGE_LEVEL
    | Constants.EFFECT_UPDATE_RANK
    | Constants.EFFECT_CHANGE_RANK
    | Constants.EFFECT_UPDATE_LSCALE
    | Constants.EFFECT_CHANGE_LSCALE
    | Constants.EFFECT_UPDATE_RSCALE
    | Constants.EFFECT_CHANGE_RSCALE
    | Constants.EFFECT_SET_POSITION
    | Constants.EFFECT_SELF_DESTROY
    | Constants.EFFECT_SELF_TOGRAVE
    | Constants.EFFECT_DOUBLE_TRIBUTE
    | Constants.EFFECT_DECREASE_TRIBUTE
    | Constants.EFFECT_DECREASE_TRIBUTE_SET
    | Constants.EFFECT_EXTRA_RELEASE
    | Constants.EFFECT_TRIBUTE_LIMIT
    | Constants.EFFECT_EXTRA_RELEASE_SUM
    | Constants.EFFECT_TRIPLE_TRIBUTE
    | Constants.EFFECT_ADD_EXTRA_TRIBUTE
    | Constants.EFFECT_EXTRA_RELEASE_NONSUM
    | Constants.EFFECT_PUBLIC
    | Constants.EFFECT_COUNTER_PERMIT
    | Constants.EFFECT_COUNTER_LIMIT
    | Constants.EFFECT_RCOUNTER_REPLACE
    | Constants.EFFECT_LPCOST_CHANGE
    | Constants.EFFECT_LPCOST_REPLACE
    | Constants.EFFECT_SKIP_DP
    | Constants.EFFECT_SKIP_SP
    | Constants.EFFECT_SKIP_M1
    | Constants.EFFECT_SKIP_BP
    | Constants.EFFECT_SKIP_M2
    | Constants.EFFECT_CANNOT_BP
    | Constants.EFFECT_CANNOT_M2
    | Constants.EFFECT_CANNOT_EP
    | Constants.EFFECT_SKIP_TURN
    | Constants.EFFECT_SKIP_EP
    | Constants.EFFECT_DEFENSE_ATTACK
    | Constants.EFFECT_MUST_ATTACK
    | Constants.EFFECT_FIRST_ATTACK
    | Constants.EFFECT_ATTACK_ALL
    | Constants.EFFECT_EXTRA_ATTACK
    | Constants.EFFECT_ONLY_BE_ATTACKED
    | Constants.EFFECT_ATTACK_DISABLED
    | Constants.EFFECT_CHANGE_BATTLE_STAT
    | Constants.EFFECT_NO_BATTLE_DAMAGE
    | Constants.EFFECT_AVOID_BATTLE_DAMAGE
    | Constants.EFFECT_REFLECT_BATTLE_DAMAGE
    | Constants.EFFECT_PIERCE
    | Constants.EFFECT_BATTLE_DESTROY_REDIRECT
    | Constants.EFFECT_BATTLE_DAMAGE_TO_EFFECT
    | Constants.EFFECT_BOTH_BATTLE_DAMAGE
    | Constants.EFFECT_ALSO_BATTLE_DAMAGE
    | Constants.EFFECT_CHANGE_BATTLE_DAMAGE
    | Constants.EFFECT_TOSS_COIN_REPLACE
    | Constants.EFFECT_TOSS_DICE_REPLACE
    | Constants.EFFECT_TOSS_COIN_CHOOSE
    | Constants.EFFECT_TOSS_DICE_CHOOSE
    | Constants.EFFECT_FUSION_MATERIAL
    | Constants.EFFECT_CHAIN_MATERIAL
    | Constants.EFFECT_SYNCHRO_MATERIAL
    | Constants.EFFECT_XYZ_MATERIAL
    | Constants.EFFECT_FUSION_SUBSTITUTE
    | Constants.EFFECT_CANNOT_BE_FUSION_MATERIAL
    | Constants.EFFECT_CANNOT_BE_SYNCHRO_MATERIAL
    | Constants.EFFECT_SYNCHRO_MATERIAL_CUSTOM
    | Constants.EFFECT_CANNOT_BE_XYZ_MATERIAL
    | Constants.EFFECT_CANNOT_BE_LINK_MATERIAL
    | Constants.EFFECT_SYNCHRO_LEVEL
    | Constants.EFFECT_RITUAL_LEVEL
    | Constants.EFFECT_XYZ_LEVEL
    | Constants.EFFECT_EXTRA_RITUAL_MATERIAL
    | Constants.EFFECT_NONTUNER
    | Constants.EFFECT_OVERLAY_REMOVE_REPLACE
    | Constants.EFFECT_CANNOT_BE_MATERIAL
    | Constants.EFFECT_PRE_MONSTER
    | Constants.EFFECT_MATERIAL_CHECK
    | Constants.EFFECT_DISABLE_FIELD
    | Constants.EFFECT_USE_EXTRA_MZONE
    | Constants.EFFECT_USE_EXTRA_SZONE
    | Constants.EFFECT_MAX_MZONE
    | Constants.EFFECT_MAX_SZONE
    | Constants.EFFECT_FORCE_MZONE
    | Constants.EFFECT_BECOME_LINKED_ZONE
    | Constants.EFFECT_HAND_LIMIT
    | Constants.EFFECT_DRAW_COUNT
    | Constants.EFFECT_SPIRIT_DONOT_RETURN
    | Constants.EFFECT_SPIRIT_MAYNOT_RETURN
    | Constants.EFFECT_CHANGE_ENVIRONMENT
    | Constants.EFFECT_NECRO_VALLEY
    | Constants.EFFECT_FORBIDDEN
    | Constants.EFFECT_NECRO_VALLEY_IM
    | Constants.EFFECT_REVERSE_DECK
    | Constants.EFFECT_REMOVE_BRAINWASHING
    | Constants.EFFECT_BP_TWICE
    | Constants.EFFECT_UNIQUE_CHECK
    | Constants.EFFECT_MATCH_KILL
    | Constants.EFFECT_SYNCHRO_CHECK
    | Constants.EFFECT_QP_ACT_IN_NTPHAND
    | Constants.EFFECT_MUST_BE_SMATERIAL
    | Constants.EFFECT_TO_GRAVE_REDIRECT_CB
    | Constants.EFFECT_CHANGE_LEVEL_FINAL
    | Constants.EFFECT_CHANGE_RANK_FINAL
    | Constants.EFFECT_MUST_BE_FMATERIAL
    | Constants.EFFECT_MUST_BE_XMATERIAL
    | Constants.EFFECT_MUST_BE_LMATERIAL
    | Constants.EFFECT_SPSUMMON_PROC_G
    | Constants.EFFECT_SPSUMMON_COUNT_LIMIT
    | Constants.EFFECT_LEFT_SPSUMMON_COUNT
    | Constants.EFFECT_CANNOT_SELECT_BATTLE_TARGET
    | Constants.EFFECT_CANNOT_SELECT_EFFECT_TARGET
    | Constants.EFFECT_ADD_SETCODE
    | Constants.EFFECT_NO_EFFECT_DAMAGE
    | Constants.EFFECT_UNSUMMONABLE_CARD
    | Constants.EFFECT_DISABLE_CHAIN_FIELD
    | Constants.EFFECT_DISCARD_COST_CHANGE
    | Constants.EFFECT_HAND_SYNCHRO
    | Constants.EFFECT_ONLY_ATTACK_MONSTER
    | Constants.EFFECT_MUST_ATTACK_MONSTER
    | Constants.EFFECT_PATRICIAN_OF_DARKNESS
    | Constants.EFFECT_EXTRA_ATTACK_MONSTER
    | Constants.EFFECT_UNION_STATUS
    | Constants.EFFECT_OLDUNION_STATUS
    | Constants.EFFECT_REMOVE_SETCODE
    | Constants.EFFECT_CHANGE_SETCODE
    | Constants.EFFECT_ALWAYS_ATTACK
    | Constants.EFFECT_EXTRA_FUSION_MATERIAL
    | Constants.EFFECT_ADD_LINK_CODE
    | Constants.EFFECT_ADD_LINK_SETCODE
    | Constants.EFFECT_EXTRA_MATERIAL
    | Constants.EFFECT_IRON_WALL
    | Constants.EFFECT_CANNOT_LOSE_DECK
    | Constants.EFFECT_CANNOT_LOSE_LP
    | Constants.EFFECT_CANNOT_LOSE_EFFECT
    | Constants.EFFECT_BP_FIRST_TURN
    | Constants.EFFECT_UNSTOPPABLE_ATTACK
    | Constants.EFFECT_ALLOW_NEGATIVE
    | Constants.EFFECT_SELF_ATTACK
    | Constants.EFFECT_BECOME_QUICK
    | Constants.EFFECT_LEVEL_RANK
    | Constants.EFFECT_RANK_LEVEL
    | Constants.EFFECT_LEVEL_RANK_S
    | Constants.EFFECT_RANK_LEVEL_S
    | Constants.EFFECT_UPDATE_LINK
    | Constants.EFFECT_CHANGE_LINK
    | Constants.EFFECT_CHANGE_LINK_FINAL
    | Constants.EFFECT_ADD_LINKMARKER
    | Constants.EFFECT_REMOVE_LINKMARKER
    | Constants.EFFECT_CHANGE_LINKMARKER
    | Constants.EFFECT_FORCE_NORMAL_SUMMON_POSITION
    | Constants.EFFECT_FORCE_SPSUMMON_POSITION
    | Constants.EFFECT_DARKNESS_HIDE
    | Constants.EFFECT_FUSION_MAT_RESTRICTION
    | Constants.EFFECT_SYNCHRO_MAT_RESTRICTION
    | Constants.EFFECT_XYZ_MAT_RESTRICTION

export type EVENT_KIND =
    | Constants.EVENT_STARTUP
    | Constants.EVENT_FLIP
    | Constants.EVENT_FREE_CHAIN
    | Constants.EVENT_DESTROY
    | Constants.EVENT_REMOVE
    | Constants.EVENT_TO_HAND
    | Constants.EVENT_TO_DECK
    | Constants.EVENT_TO_GRAVE
    | Constants.EVENT_LEAVE_FIELD
    | Constants.EVENT_CHANGE_POS
    | Constants.EVENT_RELEASE
    | Constants.EVENT_DISCARD
    | Constants.EVENT_LEAVE_FIELD_P
    | Constants.EVENT_CHAIN_SOLVING
    | Constants.EVENT_CHAIN_ACTIVATING
    | Constants.EVENT_CHAIN_SOLVED
    | Constants.EVENT_CHAIN_NEGATED
    | Constants.EVENT_CHAIN_DISABLED
    | Constants.EVENT_CHAIN_END
    | Constants.EVENT_CHAINING
    | Constants.EVENT_BECOME_TARGET
    | Constants.EVENT_DESTROYED
    | Constants.EVENT_MOVE
    | Constants.EVENT_ADJUST
    | Constants.EVENT_SUMMON_SUCCESS
    | Constants.EVENT_FLIP_SUMMON_SUCCESS
    | Constants.EVENT_SPSUMMON_SUCCESS
    | Constants.EVENT_SUMMON
    | Constants.EVENT_FLIP_SUMMON
    | Constants.EVENT_SPSUMMON
    | Constants.EVENT_MSET
    | Constants.EVENT_SSET
    | Constants.EVENT_BE_MATERIAL
    | Constants.EVENT_BE_PRE_MATERIAL
    | Constants.EVENT_DRAW
    | Constants.EVENT_DAMAGE
    | Constants.EVENT_RECOVER
    | Constants.EVENT_PREDRAW
    | Constants.EVENT_SUMMON_NEGATED
    | Constants.EVENT_FLIP_SUMMON_NEGATED
    | Constants.EVENT_SPSUMMON_NEGATED
    | Constants.EVENT_CONTROL_CHANGED
    | Constants.EVENT_EQUIP
    | Constants.EVENT_ATTACK_ANNOUNCE
    | Constants.EVENT_BE_BATTLE_TARGET
    | Constants.EVENT_BATTLE_START
    | Constants.EVENT_BATTLE_CONFIRM
    | Constants.EVENT_PRE_DAMAGE_CALCULATE
    | Constants.EVENT_PRE_BATTLE_DAMAGE
    | Constants.EVENT_BATTLED
    | Constants.EVENT_BATTLE_DESTROYING
    | Constants.EVENT_BATTLE_DESTROYED
    | Constants.EVENT_DAMAGE_STEP_END
    | Constants.EVENT_ATTACK_DISABLED
    | Constants.EVENT_BATTLE_DAMAGE
    | Constants.EVENT_TOSS_DICE
    | Constants.EVENT_TOSS_COIN
    | Constants.EVENT_TOSS_COIN_NEGATE
    | Constants.EVENT_TOSS_DICE_NEGATE
    | Constants.EVENT_LEVEL_UP
    | Constants.EVENT_PAY_LPCOST
    | Constants.EVENT_DETACH_MATERIAL
    | Constants.EVENT_RETURN_TO_GRAVE
    | Constants.EVENT_TURN_END
    | Constants.EVENT_PHASE
    | Constants.EVENT_PHASE_START
    | Constants.EVENT_ADD_COUNTER
    | Constants.EVENT_REMOVE_COUNTER
    | Constants.EVENT_CUSTOM

export type CATEGORY_KIND =
    | Constants.CATEGORY_DESTROY
    | Constants.CATEGORY_RELEASE
    | Constants.CATEGORY_REMOVE
    | Constants.CATEGORY_TOHAND
    | Constants.CATEGORY_TODECK
    | Constants.CATEGORY_TOGRAVE
    | Constants.CATEGORY_DECKDES
    | Constants.CATEGORY_HANDES
    | Constants.CATEGORY_SUMMON
    | Constants.CATEGORY_SPECIAL_SUMMON
    | Constants.CATEGORY_TOKEN
    | Constants.CATEGORY_FLIP
    | Constants.CATEGORY_POSITION
    | Constants.CATEGORY_CONTROL
    | Constants.CATEGORY_DISABLE
    | Constants.CATEGORY_DISABLE_SUMMON
    | Constants.CATEGORY_DRAW
    | Constants.CATEGORY_SEARCH
    | Constants.CATEGORY_EQUIP
    | Constants.CATEGORY_DAMAGE
    | Constants.CATEGORY_RECOVER
    | Constants.CATEGORY_ATKCHANGE
    | Constants.CATEGORY_DEFCHANGE
    | Constants.CATEGORY_COUNTER
    | Constants.CATEGORY_COIN
    | Constants.CATEGORY_DICE
    | Constants.CATEGORY_LEAVE_GRAVE
    | Constants.CATEGORY_LVCHANGE
    | Constants.CATEGORY_NEGATE
    | Constants.CATEGORY_ANNOUNCE
    | Constants.CATEGORY_FUSION_SUMMON
    | Constants.CATEGORY_TOEXTRA

export type HINT_KIND =
    | Constants.HINT_EVENT
    | Constants.HINT_MESSAGE
    | Constants.HINT_SELECTMSG
    | Constants.HINT_OPSELECTED
    | Constants.HINT_EFFECT
    | Constants.HINT_RACE
    | Constants.HINT_ATTRIB
    | Constants.HINT_CODE
    | Constants.HINT_NUMBER
    | Constants.HINT_CARD
    | Constants.HINT_ZONE
    | Constants.HINT_SKILL
    | Constants.HINT_SKILL_COVER
    | Constants.HINT_SKILL_FLIP
    | Constants.HINT_SKILL_REMOVE
    | Constants.PHINT_DESC_ADD
    | Constants.PHINT_DESC_REMOVE

export type CHINT_KIND =
    | Constants.CHINT_TURN
    | Constants.CHINT_CARD
    | Constants.CHINT_RACE
    | Constants.CHINT_ATTRIBUTE
    | Constants.CHINT_NUMBER
    | Constants.CHINT_DESC_ADD
    | Constants.CHINT_DESC_REMOVE

export type OPCODE_KIND =
    | Constants.OPCODE_ADD
    | Constants.OPCODE_SUB
    | Constants.OPCODE_MUL
    | Constants.OPCODE_DIV
    | Constants.OPCODE_AND
    | Constants.OPCODE_OR
    | Constants.OPCODE_NEG
    | Constants.OPCODE_NOT
    | Constants.OPCODE_BAND
    | Constants.OPCODE_BOR
    | Constants.OPCODE_BNOT
    | Constants.OPCODE_BXOR
    | Constants.OPCODE_LSHIFT
    | Constants.OPCODE_RSHIFT
    | Constants.OPCODE_ALLOW_ALIASES
    | Constants.OPCODE_ALLOW_TOKENS
    | Constants.OPCODE_ISCODE
    | Constants.OPCODE_ISSETCARD
    | Constants.OPCODE_ISTYPE
    | Constants.OPCODE_ISRACE
    | Constants.OPCODE_ISATTRIBUTE
    | Constants.OPCODE_GETCODE
    | Constants.OPCODE_GETSETCARD
    | Constants.OPCODE_GETTYPE
    | Constants.OPCODE_GETRACE
    | Constants.OPCODE_GETATTRIBUTE

export type HINTMSG_KIND =
    | Constants.HINTMSG_RELEASE
    | Constants.HINTMSG_DISCARD
    | Constants.HINTMSG_DESTROY
    | Constants.HINTMSG_REMOVE
    | Constants.HINTMSG_TOGRAVE
    | Constants.HINTMSG_RTOHAND
    | Constants.HINTMSG_ATOHAND
    | Constants.HINTMSG_TODECK
    | Constants.HINTMSG_SUMMON
    | Constants.HINTMSG_SPSUMMON
    | Constants.HINTMSG_SET
    | Constants.HINTMSG_FMATERIAL
    | Constants.HINTMSG_SMATERIAL
    | Constants.HINTMSG_XMATERIAL
    | Constants.HINTMSG_FACEUP
    | Constants.HINTMSG_FACEDOWN
    | Constants.HINTMSG_ATTACK
    | Constants.HINTMSG_DEFENSE
    | Constants.HINTMSG_EQUIP
    | Constants.HINTMSG_REMOVEXYZ
    | Constants.HINTMSG_CONTROL
    | Constants.HINTMSG_DESREPLACE
    | Constants.HINTMSG_FACEUPATTACK
    | Constants.HINTMSG_FACEUPDEFENSE
    | Constants.HINTMSG_FACEDOWNATTACK
    | Constants.HINTMSG_FACEDOWNDEFENSE
    | Constants.HINTMSG_CONFIRM
    | Constants.HINTMSG_TOFIELD
    | Constants.HINTMSG_POSCHANGE
    | Constants.HINTMSG_SELF
    | Constants.HINTMSG_OPPO
    | Constants.HINTMSG_TRIBUTE
    | Constants.HINTMSG_DEATTACHFROM
    | Constants.HINTMSG_LMATERIAL
    | Constants.HINTMSG_ATTACKTARGET
    | Constants.HINTMSG_EFFECT
    | Constants.HINTMSG_TARGET
    | Constants.HINTMSG_COIN
    | Constants.HINTMSG_DICE
    | Constants.HINTMSG_CARDTYPE
    | Constants.HINTMSG_OPTION
    | Constants.HINTMSG_RESOLVEEFFECT
    | Constants.HINTMSG_SELECT
    | Constants.HINTMSG_POSITION
    | Constants.HINTMSG_ATTRIBUTE
    | Constants.HINTMSG_RACE
    | Constants.HINTMSG_CODE
    | Constants.HINTMSG_NUMBER
    | Constants.HINTMSG_EFFACTIVATE
    | Constants.HINTMSG_LVRANK
    | Constants.HINTMSG_RESOLVECARD
    | Constants.HINTMSG_ZONE
    | Constants.HINTMSG_DISABLEZONE
    | Constants.HINTMSG_TOZONE
    | Constants.HINTMSG_COUNTER
    | Constants.HINTMSG_NEGATE
    | Constants.HINTMSG_ATKDEF
    | Constants.HINTMSG_APPLYTO
    | Constants.HINTMSG_ATTACH

export type TIMING_KIND =
    | Constants.TIMING_DRAW_PHASE
    | Constants.TIMING_STANDBY_PHASE
    | Constants.TIMING_MAIN_END
    | Constants.TIMING_BATTLE_START
    | Constants.TIMING_BATTLE_END
    | Constants.TIMING_END_PHASE
    | Constants.TIMING_SUMMON
    | Constants.TIMING_SPSUMMON
    | Constants.TIMING_FLIPSUMMON
    | Constants.TIMING_MSET
    | Constants.TIMING_SSET
    | Constants.TIMING_POS_CHANGE
    | Constants.TIMING_ATTACK
    | Constants.TIMING_DAMAGE_STEP
    | Constants.TIMING_DAMAGE_CAL
    | Constants.TIMING_CHAIN_END
    | Constants.TIMING_DRAW
    | Constants.TIMING_DAMAGE
    | Constants.TIMING_RECOVER
    | Constants.TIMING_DESTROY
    | Constants.TIMING_REMOVE
    | Constants.TIMING_TOHAND
    | Constants.TIMING_TODECK
    | Constants.TIMING_TOGRAVE
    | Constants.TIMING_BATTLE_PHASE
    | Constants.TIMING_EQUIP
    | Constants.TIMING_BATTLE_STEP_END
    | Constants.TIMING_BATTLED
    | Constants.TIMINGS_CHECK_MONSTER
    | Constants.TIMINGS_CHECK_MONSTER_E

export type GLOBALFLAG_KIND =
    | Constants.GLOBALFLAG_DECK_REVERSE_CHECK
    | Constants.GLOBALFLAG_BRAINWASHING_CHECK
    | Constants.GLOBALFLAG_DELAYED_QUICKEFFECT
    | Constants.GLOBALFLAG_DETACH_EVENT
    | Constants.GLOBALFLAG_SPSUMMON_COUNT
    | Constants.GLOBALFLAG_XMAT_COUNT_LIMIT
    | Constants.GLOBALFLAG_SELF_TOGRAVE
    | Constants.GLOBALFLAG_SPSUMMON_ONCE

export type EFFECT_COUNT_CODE_KIND =
    | Constants.EFFECT_COUNT_CODE_OATH
    | Constants.EFFECT_COUNT_CODE_DUEL
    | Constants.EFFECT_COUNT_CODE_SINGLE
    | Constants.EFFECT_COUNT_CODE_CHAIN

export type DUEL_MODE_KIND =
    | Constants.DUEL_MODE_SPEED
    | Constants.DUEL_MODE_RUSH
    | Constants.DUEL_MODE_GOAT
    | Constants.DUEL_MODE_MR1
    | Constants.DUEL_MODE_MR2
    | Constants.DUEL_MODE_MR3
    | Constants.DUEL_MODE_MR4
    | Constants.DUEL_MODE_MR5

export type DUEL_KIND =
    | Constants.DUEL_TEST_MODE
    | Constants.DUEL_ATTACK_FIRST_TURN
    | Constants.DUEL_USE_TRAPS_IN_NEW_CHAIN
    | Constants.DUEL_OBSOLETE_RULING
    | Constants.DUEL_PSEUDO_SHUFFLE
    | Constants.DUEL_TRIGGER_WHEN_PRIVATE_KNOWLEDGE
    | Constants.DUEL_SIMPLE_AI
    | Constants.DUEL_RELAY
    | Constants.DUEL_OBSOLETE_IGNITION
    | Constants.DUEL_1ST_TURN_DRAW
    | Constants.DUEL_1_FIELD
    | Constants.DUEL_PZONE
    | Constants.DUEL_SEPARATE_PZONE
    | Constants.DUEL_EMZONE
    | Constants.DUEL_FSX_MMZONE
    | Constants.DUEL_TRAP_MONSTERS_NOT_USE_ZONE
    | Constants.DUEL_RETURN_TO_DECK_TRIGGERS
    | Constants.DUEL_TRIGGER_ONLY_IN_LOCATION
    | Constants.DUEL_SPSUMMON_ONCE_OLD_NEGATE
    | Constants.DUEL_CANNOT_SUMMON_OATH_OLD
    | Constants.DUEL_NO_STANDBY_PHASE
    | Constants.DUEL_NO_MAIN_PHASE_2
    | Constants.DUEL_3_COLUMNS_FIELD
    | Constants.DUEL_DRAW_UNTIL_5
    | Constants.DUEL_NO_HAND_LIMIT
    | Constants.DUEL_UNLIMITED_SUMMONS
    | Constants.DUEL_INVERTED_QUICK_PRIORITY
    | Constants.DUEL_EQUIP_NOT_SENT_IF_MISSING_TARGET
    | Constants.DUEL_0_ATK_DESTROYED
    | Constants.DUEL_STORE_ATTACK_REPLAYS
    | Constants.DUEL_SINGLE_CHAIN_IN_DAMAGE_SUBSTEP
    | Constants.DUEL_CAN_REPOS_IF_NON_SUMPLAYER
    | Constants.DUEL_TCG_SEGOC_NONPUBLIC
    | Constants.DUEL_TCG_SEGOC_FIRSTTRIGGER

export type ACTIVITY_KIND =
    | Constants.ACTIVITY_SUMMON
    | Constants.ACTIVITY_NORMALSUMMON
    | Constants.ACTIVITY_SPSUMMON
    | Constants.ACTIVITY_FLIPSUMMON
    | Constants.ACTIVITY_ATTACK
    | Constants.ACTIVITY_BATTLE_PHASE
    | Constants.ACTIVITY_CHAIN

export type WIN_REASON_KIND =
    | Constants.WIN_REASON_EXODIA
    | Constants.WIN_REASON_FINAL_COUNTDOWN
    | Constants.WIN_REASON_VENNOMINAGA
    | Constants.WIN_REASON_CREATORGOD
    | Constants.WIN_REASON_EXODIUS
    | Constants.WIN_REASON_DESTINY_BOARD
    | Constants.WIN_REASON_LAST_TURN
    | Constants.WIN_REASON_PUPPET_LEO
    | Constants.WIN_REASON_DISASTER_LEO
    | Constants.WIN_REASON_JACKPOT7
    | Constants.WIN_REASON_RELAY_SOUL
    | Constants.WIN_REASON_GHOSTRICK_MISCHIEF
    | Constants.WIN_REASON_PHANTASM_SPIRAL
    | Constants.WIN_REASON_FA_WINNERS
    | Constants.WIN_REASON_FLYING_ELEPHANT
    | Constants.WIN_REASON_EXODIA_DEFENDER
    | Constants.WIN_REASON_MATCH_WINNER
    | Constants.WIN_REASON_TRUE_EXODIA
    | Constants.WIN_REASON_FINAL_DRAW
    | Constants.WIN_REASON_CREATOR_MIRACLE
    | Constants.WIN_REASON_EVIL_1
    | Constants.WIN_REASON_NUMBER_Ci1000
    | Constants.WIN_REASON_ZERO_GATE
    | Constants.WIN_REASON_DEUCE
    | Constants.WIN_REASON_DECK_MASTER
    | Constants.WIN_REASON_DRAW_OF_FATE
    | Constants.WIN_REASON_MUSICAL_SUMO

export type ANNOUNCE_KIND =
    | Constants.ANNOUNCE_CARD
    | Constants.ANNOUNCE_CARD_FILTER

export type REGISTER_FLAG_KIND =
    | Constants.REGISTER_FLAG_DETACH_XMAT
    | Constants.REGISTER_FLAG_CARDIAN
    | Constants.REGISTER_FLAG_THUNDRA
    | Constants.REGISTER_FLAG_ALLURE_LVUP
    | Constants.REGISTER_FLAG_TELLAR

export type FUSPROC_KIND =
    | Constants.FUSPROC_NOTFUSION
    | Constants.FUSPROC_CONTACTFUS
    | Constants.FUSPROC_LISTEDMATS
    | Constants.FUSPROC_NOLIMIT
    | Constants.FUSPROC_CANCELABLE

export type MATERIAL_KIND =
    | Constants.MATERIAL_FUSION
    | Constants.MATERIAL_SYNCHRO
    | Constants.MATERIAL_XYZ
    | Constants.MATERIAL_LINK

export type EFFECT_CLIENT_MODE_KIND =
    | Constants.EFFECT_CLIENT_MODE_NORMAL
    | Constants.EFFECT_CLIENT_MODE_RESOLVE
    | Constants.EFFECT_CLIENT_MODE_RESET

export type SELECT_KIND =
    | Constants.SELECT_HEADS
    | Constants.SELECT_TAILS
