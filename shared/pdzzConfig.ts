/* Generated from D:/agentpro/pdzz static APK extraction. */
export type PdzzTrapEffect = 'kill' | 'ice' | 'bounce' | 'slow' | 'teleport' | 'wall' | 'boost' | 'wind' | 'reverse'
export type PdzzMapElement = {} & { id: string; index: number; position: { x: number; y: number }; angle: number; semanticKey: string; extension: { tag: string; sprite: string; spriteX: number; spriteY: number; scale: number; flipX: boolean; flipY: boolean; zOrder: number; alpha: number; isSliced: boolean; slicedWidth: number; slicedHeight: number }; collider: { shape: 'box' | 'circle'; width: number | null; height: number | null; radius: number | null; rotation: number; hazard: boolean; colliderType: number } | null }
export type PdzzMapDefinition = { id: string; sourceId: string; name: string; available: boolean; supportTeamBattle: boolean; supportAIBattle: boolean; noFlag?: boolean; minX: number; minY: number; width: number; height: number; editMinX?: number; editMinY?: number; editWidth?: number; editHeight?: number; spawnX: number; spawnY: number; finishX: number; finishY: number; secondarySpawnPoints?: Array<{ x: number; y: number }>; secondaryFinishPoints?: Array<{ x: number; y: number }>; backgroundAsset: string | null; thumbnailAsset: string | null; atlasAsset: string | null; atlasImageAsset: string | null; skySprite: string | null; spriteAssets: Record<string, string>; elements: PdzzMapElement[] }
export type PdzzComponentDefinition = { id: string; name: string; description: string; width: number; height: number; viewWidth: number; viewHeight: number; cells: number[][]; glyph: string; color: string; placement: 'free' | 'supported'; effect: PdzzTrapEffect; collisionMode: 'solid' | 'trigger' | 'hybrid' | 'none'; category: string; sourceType: string; componentType: number; defaultDir: number; rotateMode: number; snapToGround: boolean; fullrect: boolean; danToUnlock: number; isVip: boolean; available: boolean; iconSource: 'game' | 'component' | null; iconFrame: string | null; iconAsset: string | null; iconCrop: { x: number; y: number; width: number; height: number } | null; iconConfidence: 'exact' | 'alias' | 'missing'; maxCountInLevel: number }
export type PdzzCharacterDefinition = { id: string; refID: string; name: string; description: string; avatarID: string; imageAsset: string | null; available: boolean }
export const PDZZ_PHYSICS = {
  "fixedTimeStepMs": 17,
  "timerDefaults": {
    "maxFixedUpdatePerFrame": 3,
    "timeToIngorePhysicsUpdate": 100
  },
  "physicsDefaults": {
    "gravity": {
      "x": 0,
      "y": 300
    },
    "spatialHashCellSize": 100,
    "startupSpatialHashCellSize": 50,
    "raycastsHitTriggers": false,
    "raycastsStartInColliders": false
  },
  "rigidbodyDefaults": {
    "mass": 10,
    "elasticity": 0.5,
    "friction": 0.5,
    "glue": 0.01
  },
  "characterController": {
    "colliderWidth": 30,
    "colliderHeight": 60,
    "slopeLimitDegrees": 30,
    "jumpingThreshold": -7,
    "horizontalRays": 5,
    "verticalRays": 3,
    "skinWidth": 0.02
  },
  "player": {
    "normalHorizontalSpeed": 250,
    "iceHorizontalSpeed": 350,
    "mudHorizontalSpeed": 100,
    "horizontalInputAcceleration": 2000,
    "jumpWidth": 250,
    "jumpHeight": 210,
    "mudJumpHeight": 60,
    "wallJumpWidth": 450,
    "wallJumpHeight": 150,
    "jumpUpGravityVariation": 3.5,
    "springJumpUpGravityVariation": 1.5,
    "fallGravityVariation": 1.2,
    "wallGravityVariation": 0.2,
    "mudWallGravityVariation": 2,
    "iceWallGravityVariation": 0.5,
    "maxFallSpeed": 2000,
    "maxUpSpeed": -1135,
    "maxExtraHorizontalAirSpeed": 1500,
    "maxWallSlideSpeed": 500,
    "maxIceWallSlideSpeed": 2000,
    "maxMudWallSlideSpeed": 100
  },
  "cellVisualSize": 50,
  "playerDerived": {
    "jumpTimeToApexSeconds": 0.5,
    "gravity": 1680,
    "normalJumpStartVelocity": -840,
    "mudJumpStartVelocity": -448.998886412873,
    "wallJumpStartVerticalVelocity": -709.9295739719539,
    "wallJumpStartHorizontalVelocity": 900,
    "wallJumpAirHorizontalForce": 3600,
    "fanRangeCells": 3,
    "fanRangePixels": 150,
    "fanHorizontalPushPerTick": 120,
    "fanVerticalPushGravityMultiplier": [
      5,
      10
    ]
  },
  "componentMechanics": {
    "cannon": {
      "projectileSpeed": 200,
      "startCooldownSeconds": 3,
      "intervalSeconds": 3.5,
      "rangeCells": 15
    },
    "balloonCannon": {
      "projectileSpeed": 150,
      "startCooldownSeconds": 3,
      "intervalSeconds": 2.5
    },
    "spring": {
      "jumpHeightMultiplier": 1.5,
      "triggerSpringVelocityMultiplier": 1.1,
      "triggersSpringUsesPlayerJumpVelocity": true
    },
    "linearSaw": {
      "defaultSpeed": 300,
      "intervalSeconds": 3,
      "pingPongSpeed": 0.2,
      "maxRotationDegrees": 60
    }
  }
} as const
export const PDZZ_MAPS: PdzzMapDefinition[] = [
  {
    "id": "bgbluesky",
    "sourceId": "bgbluesky",
    "name": "bgbluesky",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": true,
    "minX": 200,
    "minY": -2200,
    "width": 1950,
    "height": 2650,
    "editMinX": 300,
    "editMinY": -1650,
    "editWidth": 1750,
    "editHeight": 1750,
    "spawnX": 1191,
    "spawnY": -600,
    "finishX": 1400,
    "finishY": -600,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": null,
    "atlasAsset": null,
    "atlasImageAsset": null,
    "skySprite": "bgbluesky/bluesky",
    "spriteAssets": {
      "bgbluesky/skyblue": "/game/assets/pdzz/maps/bgbluesky/skyblue.png",
      "bgbluesky/skydusk": "/game/assets/pdzz/maps/bgbluesky/skydusk.png",
      "bgbluesky/skygreen": "/game/assets/pdzz/maps/bgbluesky/skygreen.png",
      "bgbluesky/skynight": "/game/assets/pdzz/maps/bgbluesky/skynight.png",
      "bgbluesky/skypurple": "/game/assets/pdzz/maps/bgbluesky/skypurple.png",
      "bgbluesky/skyyellow": "/game/assets/pdzz/maps/bgbluesky/skyyellow.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1914,
          "y": -973
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "bgbluesky/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 562,
          "y": -894
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "bgbluesky/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1163,
          "y": -269
        },
        "angle": 0,
        "semanticKey": "cloud",
        "extension": {
          "tag": "",
          "sprite": "bgbluesky/cloud",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 4,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1161,
          "y": 340
        },
        "angle": 0,
        "semanticKey": "foreground",
        "extension": {
          "tag": "",
          "sprite": "bgbluesky/foreground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2212,
          "slicedHeight": 500
        },
        "collider": null
      }
    ]
  },
  {
    "id": "bgfree",
    "sourceId": "bgfree",
    "name": "bgfree",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": true,
    "minX": 0,
    "minY": 0,
    "width": 3072,
    "height": 672,
    "editMinX": 0,
    "editMinY": 0,
    "editWidth": 1500,
    "editHeight": 1500,
    "spawnX": 640,
    "spawnY": 800,
    "finishX": 850,
    "finishY": 800,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": null,
    "atlasAsset": null,
    "atlasImageAsset": null,
    "skySprite": null,
    "spriteAssets": {},
    "elements": []
  },
  {
    "id": "bgtall",
    "sourceId": "bgtall",
    "name": "bgtall",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": true,
    "minX": 600,
    "minY": -4800,
    "width": 1050,
    "height": 5750,
    "editMinX": 750,
    "editMinY": -4400,
    "editWidth": 750,
    "editHeight": 4500,
    "spawnX": 1100,
    "spawnY": -50,
    "finishX": 1100,
    "finishY": -500,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": null,
    "atlasAsset": null,
    "atlasImageAsset": null,
    "skySprite": "bgtall/sky",
    "spriteAssets": {
      "bgtall/boss2": "/game/assets/pdzz/maps/bgtall/boss2.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 990,
          "y": -360
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "bgtall/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 550,
          "y": -850
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "bgtall/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 440,
          "y": -1590
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "bgtall/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 840,
          "y": -2690
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "bgtall/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 650,
          "y": -4180
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "bgtall/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 3.7929999828338623,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "circlecollider",
        "index": 6,
        "position": {
          "x": 1123,
          "y": 957
        },
        "angle": 0,
        "semanticKey": "bosspivot",
        "extension": {
          "tag": "bosspivot",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 5,
          "rotation": 0,
          "hazard": true,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 827,
          "y": 799
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 560,
          "height": 375,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 8,
        "position": {
          "x": 910,
          "y": 313
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 207,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 9,
        "position": {
          "x": 1348,
          "y": 300
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 207,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "bgwide",
    "sourceId": "bgwide",
    "name": "bgwide",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": true,
    "minX": 200,
    "minY": -1150,
    "width": 6000,
    "height": 1750,
    "editMinX": 700,
    "editMinY": -600,
    "editWidth": 5000,
    "editHeight": 600,
    "spawnX": 800,
    "spawnY": -50,
    "finishX": 1200,
    "finishY": -50,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": null,
    "atlasAsset": null,
    "atlasImageAsset": null,
    "skySprite": "bgwide/sky",
    "spriteAssets": {
      "bgwide/boss": "/game/assets/pdzz/maps/bgwide/boss.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 3706,
          "y": 282
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "bgwide/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 3.7929999828338623,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 5151,
          "y": -148
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "bgwide/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1799,
          "y": -363
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "bgwide/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1084,
          "y": -672
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "bgwide/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 2694,
          "y": -716
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "bgwide/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "circlecollider",
        "index": 6,
        "position": {
          "x": 357,
          "y": 294
        },
        "angle": 0,
        "semanticKey": "bosspivot",
        "extension": {
          "tag": "bosspivot",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 5,
          "rotation": 0,
          "hazard": true,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 288,
          "y": 223
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 145,
          "height": 220,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": 65,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 575,
          "height": 215,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 9,
        "position": {
          "x": 67,
          "y": -223
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 515,
          "height": 130,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 10,
        "position": {
          "x": 65,
          "y": -350
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 575,
          "height": 140,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 181,
          "y": -500
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 360,
          "height": 115,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "home",
    "sourceId": "levelhome",
    "name": "home",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": true,
    "minX": 200,
    "minY": -1300,
    "width": 1800,
    "height": 1700,
    "editMinX": 200,
    "editMinY": -1300,
    "editWidth": 1800,
    "editHeight": 1700,
    "spawnX": 1192,
    "spawnY": 0,
    "finishX": 1800,
    "finishY": 0,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": null,
    "atlasAsset": null,
    "atlasImageAsset": null,
    "skySprite": "",
    "spriteAssets": {},
    "elements": [
      {
        "id": "boxcollider",
        "index": 1,
        "position": {
          "x": 100,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2300,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "levelaladin",
    "sourceId": "levelaladin",
    "name": "阿拉丁",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 350,
    "minY": -1400,
    "width": 1550,
    "height": 1800,
    "editMinX": 350,
    "editMinY": -1350,
    "editWidth": 1550,
    "editHeight": 1500,
    "spawnX": 506,
    "spawnY": -1050,
    "finishX": 1750,
    "finishY": -200,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelaladin.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelaladin/levelaladin.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelaladin/levelaladin.png",
    "skySprite": "levelaladin/sky",
    "spriteAssets": {
      "levelaladin/bg_building": "/game/assets/pdzz/maps/levelaladin/bg_building.png",
      "levelaladin/bg_cloud": "/game/assets/pdzz/maps/levelaladin/bg_cloud.png",
      "levelaladin/bg_moon": "/game/assets/pdzz/maps/levelaladin/bg_moon.png",
      "levelaladin/cloud": "/game/assets/pdzz/maps/levelaladin/cloud.png",
      "levelaladin/cloud2": "/game/assets/pdzz/maps/levelaladin/cloud2.png",
      "levelaladin/sky": "/game/assets/pdzz/maps/levelaladin/sky.png",
      "levelaladin/finish": "/game/assets/pdzz/maps/levelaladin/frames/finish.png",
      "levelaladin/moveplatform": "/game/assets/pdzz/maps/levelaladin/frames/moveplatform.png",
      "levelaladin/start": "/game/assets/pdzz/maps/levelaladin/frames/start.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1123,
          "y": -145
        },
        "angle": 0,
        "semanticKey": "bg_cloud",
        "extension": {
          "tag": "",
          "sprite": "levelaladin/bg_cloud",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 1089,
          "y": 28
        },
        "angle": 0,
        "semanticKey": "bg_building",
        "extension": {
          "tag": "",
          "sprite": "levelaladin/bg_building",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1086,
          "y": -551
        },
        "angle": 0,
        "semanticKey": "bg_moon",
        "extension": {
          "tag": "",
          "sprite": "levelaladin/bg_moon",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 4,
        "position": {
          "x": 1650,
          "y": -100
        },
        "angle": 0,
        "semanticKey": "finish",
        "extension": {
          "tag": "finish",
          "sprite": "levelaladin/finish",
          "spriteX": 101,
          "spriteY": -46,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 5,
        "position": {
          "x": 1100,
          "y": -800
        },
        "angle": 0,
        "semanticKey": "move",
        "extension": {
          "tag": "move",
          "sprite": "levelaladin/moveplatform",
          "spriteX": 102,
          "spriteY": -51,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 400,
          "y": -950
        },
        "angle": 0,
        "semanticKey": "start",
        "extension": {
          "tag": "start",
          "sprite": "levelaladin/start",
          "spriteX": 101,
          "spriteY": -48,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 1122,
          "y": 185
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "levelaladin/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1467,
          "y": 18
        },
        "angle": 0,
        "semanticKey": "cloud",
        "extension": {
          "tag": "",
          "sprite": "levelaladin/cloud",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelalice",
    "sourceId": "levelalice",
    "name": "爱丽丝",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 300,
    "minY": -2050,
    "width": 1100,
    "height": 2400,
    "editMinX": 350,
    "editMinY": -1700,
    "editWidth": 1000,
    "editHeight": 1800,
    "spawnX": 827,
    "spawnY": -100,
    "finishX": 844,
    "finishY": -1041,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelalice.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelalice/levelalice.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelalice/levelalice.png",
    "skySprite": "",
    "spriteAssets": {
      "levelalice/bookshelf": "/game/assets/pdzz/maps/levelalice/bookshelf.png",
      "levelalice/pattern": "/game/assets/pdzz/maps/levelalice/pattern.png",
      "levelalice/watch": "/game/assets/pdzz/maps/levelalice/watch.png",
      "levelalice/watchhand": "/game/assets/pdzz/maps/levelalice/frames/watchhand.png",
      "levelalice/closet": "/game/assets/pdzz/maps/levelalice/frames/closet.png",
      "levelalice/picframe": "/game/assets/pdzz/maps/levelalice/frames/picframe.png",
      "levelalice/alarmclock": "/game/assets/pdzz/maps/levelalice/frames/alarmclock.png",
      "levelalice/redbutton": "/game/assets/pdzz/maps/levelalice/frames/redbutton.png",
      "levelalice/arrow": "/game/assets/pdzz/maps/levelalice/frames/arrow.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 847,
          "y": -1531
        },
        "angle": 0,
        "semanticKey": "watch",
        "extension": {
          "tag": "",
          "sprite": "levelalice/watch",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 844,
          "y": -1372
        },
        "angle": 0,
        "semanticKey": "watchhand",
        "extension": {
          "tag": "",
          "sprite": "levelalice/watchhand",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 3,
        "position": {
          "x": 600,
          "y": 200
        },
        "angle": 0,
        "semanticKey": "closet",
        "extension": {
          "tag": "",
          "sprite": "levelalice/closet",
          "spriteX": 224,
          "spriteY": -150,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 4,
        "position": {
          "x": 250,
          "y": -400
        },
        "angle": 0,
        "semanticKey": "picframe",
        "extension": {
          "tag": "",
          "sprite": "levelalice/picframe",
          "spriteX": 152,
          "spriteY": -171,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 350,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 5,
        "position": {
          "x": 1332,
          "y": -800
        },
        "angle": 0,
        "semanticKey": "alarmclock",
        "extension": {
          "tag": "alarmclock",
          "sprite": "levelalice/alarmclock",
          "spriteX": 42,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 85,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 1350,
          "y": -900
        },
        "angle": 0,
        "semanticKey": "button",
        "extension": {
          "tag": "button",
          "sprite": "levelalice/redbutton",
          "spriteX": 25,
          "spriteY": -11,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 25,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 1396,
          "y": -1069
        },
        "angle": 0,
        "semanticKey": "arrow",
        "extension": {
          "tag": "",
          "sprite": "levelalice/arrow",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.25,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": 1250,
          "y": -250
        },
        "angle": 0,
        "semanticKey": "bookshelf",
        "extension": {
          "tag": "bookshelf",
          "sprite": "levelalice/bookshelf",
          "spriteX": 86,
          "spriteY": -326,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 650,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "levelatlantis",
    "sourceId": "levelatlantis",
    "name": "亚特兰蒂斯",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 300,
    "minY": -2050,
    "width": 1350,
    "height": 2350,
    "editMinX": 350,
    "editMinY": -1900,
    "editWidth": 1250,
    "editHeight": 1900,
    "spawnX": 1177,
    "spawnY": -700,
    "finishX": 1450,
    "finishY": -1800,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelatlantis.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelatlantis/levelatlantis.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelatlantis/levelatlantis.png",
    "skySprite": "levelatlantis/sky",
    "spriteAssets": {
      "levelatlantis/bg_building2": "/game/assets/pdzz/maps/levelatlantis/bg_building2.png",
      "levelatlantis/bg_wave": "/game/assets/pdzz/maps/levelatlantis/bg_wave.png",
      "levelatlantis/foreground": "/game/assets/pdzz/maps/levelatlantis/foreground.png",
      "levelatlantis/grounddust": "/game/assets/pdzz/maps/levelatlantis/grounddust.png",
      "levelatlantis/sky": "/game/assets/pdzz/maps/levelatlantis/frames/sky.png",
      "levelatlantis/bg_misc1": "/game/assets/pdzz/maps/levelatlantis/frames/bg_misc1.png",
      "levelatlantis/bg_misc3": "/game/assets/pdzz/maps/levelatlantis/frames/bg_misc3.png",
      "levelatlantis/bg_misc2": "/game/assets/pdzz/maps/levelatlantis/frames/bg_misc2.png",
      "levelatlantis/bg_building1": "/game/assets/pdzz/maps/levelatlantis/frames/bg_building1.png",
      "levelatlantis/bg_misc7": "/game/assets/pdzz/maps/levelatlantis/frames/bg_misc7.png",
      "levelatlantis/polelong": "/game/assets/pdzz/maps/levelatlantis/frames/polelong.png",
      "levelatlantis/wall2": "/game/assets/pdzz/maps/levelatlantis/frames/wall2.png",
      "levelatlantis/wall1": "/game/assets/pdzz/maps/levelatlantis/frames/wall1.png",
      "levelatlantis/poleshort": "/game/assets/pdzz/maps/levelatlantis/frames/poleshort.png",
      "levelatlantis/bg_misc4": "/game/assets/pdzz/maps/levelatlantis/frames/bg_misc4.png",
      "levelatlantis/pole1": "/game/assets/pdzz/maps/levelatlantis/frames/pole1.png",
      "levelatlantis/walldouble": "/game/assets/pdzz/maps/levelatlantis/frames/walldouble.png",
      "levelatlantis/ground": "/game/assets/pdzz/maps/levelatlantis/frames/ground.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1055,
          "y": -243
        },
        "angle": 0,
        "semanticKey": "grounddust",
        "extension": {
          "tag": "",
          "sprite": "levelatlantis/grounddust",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2.5,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.4901960790157318,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 397,
          "y": -604
        },
        "angle": 0,
        "semanticKey": "bg_misc1",
        "extension": {
          "tag": "",
          "sprite": "levelatlantis/bg_misc1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 944,
          "y": -1702
        },
        "angle": 0,
        "semanticKey": "bg_wave",
        "extension": {
          "tag": "",
          "sprite": "levelatlantis/bg_wave",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1231,
          "y": -153
        },
        "angle": 0,
        "semanticKey": "bg_misc3",
        "extension": {
          "tag": "",
          "sprite": "levelatlantis/bg_misc3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 884,
          "y": -161
        },
        "angle": 0,
        "semanticKey": "bg_misc2",
        "extension": {
          "tag": "",
          "sprite": "levelatlantis/bg_misc2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 325,
          "y": -1154
        },
        "angle": 0,
        "semanticKey": "bg_building1",
        "extension": {
          "tag": "",
          "sprite": "levelatlantis/bg_building1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 1329,
          "y": -1332
        },
        "angle": 0,
        "semanticKey": "bg_building2",
        "extension": {
          "tag": "",
          "sprite": "levelatlantis/bg_building2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1124,
          "y": -866
        },
        "angle": 0,
        "semanticKey": "bg_misc7",
        "extension": {
          "tag": "",
          "sprite": "levelatlantis/bg_misc7",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 9,
        "position": {
          "x": 250,
          "y": 200
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1600,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 10,
        "position": {
          "x": 350,
          "y": -100
        },
        "angle": 0,
        "semanticKey": "fall2",
        "extension": {
          "tag": "fall2",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 950,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 376,
          "y": -561
        },
        "angle": 0,
        "semanticKey": "fall2",
        "extension": {
          "tag": "fall2",
          "sprite": "levelatlantis/polelong",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 66,
          "slicedHeight": 976
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": 800,
          "y": -600
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/wall2",
          "spriteX": 99,
          "spriteY": -25,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 650,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 1204,
          "y": -625
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/wall1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 495,
          "slicedHeight": 52
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 14,
        "position": {
          "x": 1350,
          "y": -650
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/poleshort",
          "spriteX": 26,
          "spriteY": -100,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 200,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 15,
        "position": {
          "x": 1050,
          "y": -650
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 1350,
          "y": -650
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/poleshort",
          "spriteX": 26,
          "spriteY": -100,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 200,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 17,
        "position": {
          "x": 850,
          "y": -650
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/poleshort",
          "spriteX": 26,
          "spriteY": -100,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 200,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 18,
        "position": {
          "x": 1150,
          "y": -675
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/wall1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 202,
          "slicedHeight": 52
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 19,
        "position": {
          "x": 1680,
          "y": -762
        },
        "angle": 0,
        "semanticKey": "bg_misc4",
        "extension": {
          "tag": "",
          "sprite": "levelatlantis/bg_misc4",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 20,
        "position": {
          "x": 750,
          "y": -850
        },
        "angle": 0,
        "semanticKey": "fallbase1",
        "extension": {
          "tag": "fallbase1",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 21,
        "position": {
          "x": 849,
          "y": -875
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/wall1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 22,
        "position": {
          "x": 800,
          "y": -900
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/polelong",
          "spriteX": 26,
          "spriteY": -150,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 23,
        "position": {
          "x": 250,
          "y": -1050
        },
        "angle": 0,
        "semanticKey": "fallbase2",
        "extension": {
          "tag": "fallbase2",
          "sprite": "levelatlantis/wall1",
          "spriteX": 103,
          "spriteY": -25,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 24,
        "position": {
          "x": 700,
          "y": -1200
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 850,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 25,
        "position": {
          "x": 1126,
          "y": -1225
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/wall1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 857,
          "slicedHeight": 52
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 26,
        "position": {
          "x": 750,
          "y": -1250
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/pole1",
          "spriteX": 25,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 27,
        "position": {
          "x": 850,
          "y": -1500
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/wall2",
          "spriteX": 99,
          "spriteY": -25,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 500,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 28,
        "position": {
          "x": 1350,
          "y": -1500
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/poleshort",
          "spriteX": 26,
          "spriteY": -100,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 200,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 29,
        "position": {
          "x": 1200,
          "y": -1525
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/wall1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 302,
          "slicedHeight": 52
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 30,
        "position": {
          "x": 1050,
          "y": -1550
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/polelong",
          "spriteX": 26,
          "spriteY": -150,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 31,
        "position": {
          "x": 900,
          "y": -1550
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/pole1",
          "spriteX": 25,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 32,
        "position": {
          "x": 1300,
          "y": -1700
        },
        "angle": 0,
        "semanticKey": "fall1",
        "extension": {
          "tag": "fall1",
          "sprite": "levelatlantis/walldouble",
          "spriteX": 203,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 33,
        "position": {
          "x": 1046,
          "y": 129
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "",
          "sprite": "levelatlantis/ground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 1760,
          "slicedHeight": 459
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 34,
        "position": {
          "x": 984,
          "y": 101
        },
        "angle": 0,
        "semanticKey": "foreground",
        "extension": {
          "tag": "",
          "sprite": "levelatlantis/foreground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.6534600257873535,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelclassic",
    "sourceId": "levelclassic",
    "name": "经典",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 400,
    "minY": -1400,
    "width": 1400,
    "height": 1800,
    "editMinX": 450,
    "editMinY": -1300,
    "editWidth": 1300,
    "editHeight": 1500,
    "spawnX": 1255,
    "spawnY": 0,
    "finishX": 1255,
    "finishY": -1092,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelclassic.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelclassic/levelclassic.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelclassic/levelclassic.png",
    "skySprite": "levelclassic/sky",
    "spriteAssets": {
      "levelclassic/castle": "/game/assets/pdzz/maps/levelclassic/castle.png",
      "levelclassic/groundtile": "/game/assets/pdzz/maps/levelclassic/groundtile.png",
      "levelclassic/sky": "/game/assets/pdzz/maps/levelclassic/frames/sky.png",
      "levelclassic/grassbig": "/game/assets/pdzz/maps/levelclassic/frames/grassbig.png",
      "levelclassic/cloud2": "/game/assets/pdzz/maps/levelclassic/frames/cloud2.png",
      "levelclassic/grasssmall": "/game/assets/pdzz/maps/levelclassic/frames/grasssmall.png",
      "levelclassic/pipe": "/game/assets/pdzz/maps/levelclassic/frames/pipe.png",
      "levelclassic/liftswitch": "/game/assets/pdzz/maps/levelclassic/frames/liftswitch.png",
      "levelclassic/flagpole": "/game/assets/pdzz/maps/levelclassic/frames/flagpole.png",
      "levelclassic/lift": "/game/assets/pdzz/maps/levelclassic/frames/lift.png",
      "levelclassic/wallshort": "/game/assets/pdzz/maps/levelclassic/frames/wallshort.png",
      "levelclassic/walllong": "/game/assets/pdzz/maps/levelclassic/frames/walllong.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1125,
          "y": -49
        },
        "angle": 0,
        "semanticKey": "grassbig",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/grassbig",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 1587,
          "y": -613
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 752,
          "y": -969
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 5.806600093841553,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 409,
          "y": -26
        },
        "angle": 0,
        "semanticKey": "grasssmall",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/grasssmall",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1562,
          "y": -153
        },
        "angle": 0,
        "semanticKey": "castle",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/castle",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 500,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "pipe",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/pipe",
          "spriteX": 75,
          "spriteY": -45,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 150,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 900,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "groundright",
        "extension": {
          "tag": "groundright",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1350,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": -50,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "groundleft",
        "extension": {
          "tag": "groundleft",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 750,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 9,
        "position": {
          "x": 650,
          "y": 35
        },
        "angle": 0,
        "semanticKey": "switchbottom",
        "extension": {
          "tag": "switchbottom",
          "sprite": "levelclassic/liftswitch",
          "spriteX": 23,
          "spriteY": -35,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 10,
        "position": {
          "x": 650,
          "y": -714
        },
        "angle": 0,
        "semanticKey": "switchtop",
        "extension": {
          "tag": "switchtop",
          "sprite": "levelclassic/liftswitch",
          "spriteX": 23,
          "spriteY": -35,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 1275,
          "y": -1030
        },
        "angle": 0,
        "semanticKey": "flagpole",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/flagpole",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": 700,
          "y": 100
        },
        "angle": 0,
        "semanticKey": "lift",
        "extension": {
          "tag": "lift",
          "sprite": "levelclassic/lift",
          "spriteX": 50,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 13,
        "position": {
          "x": 600,
          "y": -650
        },
        "angle": 0,
        "semanticKey": "wallshort",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/wallshort",
          "spriteX": 50,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 14,
        "position": {
          "x": 1100,
          "y": -750
        },
        "angle": 0,
        "semanticKey": "walllong",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/walllong",
          "spriteX": 176,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 350,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 15,
        "position": {
          "x": 900,
          "y": -750
        },
        "angle": 0,
        "semanticKey": "wallshort",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/wallshort",
          "spriteX": 50,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 1250,
          "y": -850
        },
        "angle": 0,
        "semanticKey": "flagpole",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/flagpole",
          "spriteX": 25,
          "spriteY": -180,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 17,
        "position": {
          "x": 1553,
          "y": 226
        },
        "angle": 0,
        "semanticKey": "groundtile",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/groundtile",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 1310,
          "slicedHeight": 450
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 18,
        "position": {
          "x": 398,
          "y": 224
        },
        "angle": 0,
        "semanticKey": "groundtile",
        "extension": {
          "tag": "",
          "sprite": "levelclassic/groundtile",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 605,
          "slicedHeight": 450
        },
        "collider": null
      }
    ]
  },
  {
    "id": "leveldrum",
    "sourceId": "leveldrum",
    "name": "太鼓",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 0,
    "minY": -1500,
    "width": 2200,
    "height": 2000,
    "editMinX": 100,
    "editMinY": -1400,
    "editWidth": 1700,
    "editHeight": 1500,
    "spawnX": 296,
    "spawnY": 50,
    "finishX": 1800,
    "finishY": -1150,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/leveldrum.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/leveldrum/leveldrum.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/leveldrum/leveldrum.png",
    "skySprite": "leveldrum2/sky",
    "spriteAssets": {
      "leveldrum2/background": "/game/assets/pdzz/maps/leveldrum/background.png",
      "leveldrum2/bell": "/game/assets/pdzz/maps/leveldrum/bell.png",
      "leveldrum2/pattern": "/game/assets/pdzz/maps/leveldrum/pattern.png",
      "leveldrum2/pole_l": "/game/assets/pdzz/maps/leveldrum/pole_l.png",
      "leveldrum2/pole_r": "/game/assets/pdzz/maps/leveldrum/pole_r.png",
      "leveldrum2/scaffold": "/game/assets/pdzz/maps/leveldrum/scaffold.png",
      "leveldrum2/sky": "/game/assets/pdzz/maps/leveldrum/sky.png",
      "leveldrum2/pole_v": "/game/assets/pdzz/maps/leveldrum/frames/pole_v.png",
      "leveldrum2/pole_h": "/game/assets/pdzz/maps/leveldrum/frames/pole_h.png",
      "leveldrum2/lantern": "/game/assets/pdzz/maps/leveldrum/frames/lantern.png",
      "leveldrum2/drum4x6": "/game/assets/pdzz/maps/leveldrum/frames/drum4x6.png",
      "leveldrum2/drum2x2": "/game/assets/pdzz/maps/leveldrum/frames/drum2x2.png",
      "leveldrum2/drum2x3": "/game/assets/pdzz/maps/leveldrum/frames/drum2x3.png",
      "leveldrum2/drum2x1": "/game/assets/pdzz/maps/leveldrum/frames/drum2x1.png",
      "leveldrum2/ground_l": "/game/assets/pdzz/maps/leveldrum/frames/ground_l.png",
      "leveldrum2/garland": "/game/assets/pdzz/maps/leveldrum/frames/garland.png",
      "leveldrum2/ground_r": "/game/assets/pdzz/maps/leveldrum/frames/ground_r.png",
      "leveldrum2/wave": "/game/assets/pdzz/maps/leveldrum/frames/wave.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 282,
          "y": -268
        },
        "angle": 0,
        "semanticKey": "pole_l",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_l",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 51,
          "slicedHeight": 1550
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 499,
          "y": -258
        },
        "angle": 0,
        "semanticKey": "pole_v",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_v",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 12,
          "slicedHeight": 1500
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 705,
          "y": -263
        },
        "angle": 0,
        "semanticKey": "pole_v",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_v",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 12,
          "slicedHeight": 1500
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 951,
          "y": -266
        },
        "angle": 0,
        "semanticKey": "pole_v",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_v",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 12,
          "slicedHeight": 1500
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1400,
          "y": -274
        },
        "angle": 0,
        "semanticKey": "pole_v",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_v",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 12,
          "slicedHeight": 1500
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1091,
          "y": -598
        },
        "angle": 0,
        "semanticKey": "pattern",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pattern",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2390,
          "slicedHeight": 1610
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 1498,
          "y": -331
        },
        "angle": 0,
        "semanticKey": "pole_r",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_r",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 51,
          "slicedHeight": 1428
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1057,
          "y": -273
        },
        "angle": 0,
        "semanticKey": "background",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/background",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2474,
          "slicedHeight": 349
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 887,
          "y": -1015
        },
        "angle": 0,
        "semanticKey": "pole_h",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_h",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 1180,
          "slicedHeight": 28
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 1953,
          "y": -840
        },
        "angle": 0,
        "semanticKey": "lantern",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/lantern",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 150,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "drumgiant",
        "extension": {
          "tag": "drumgiant",
          "sprite": "leveldrum2/drum4x6",
          "spriteX": 101,
          "spriteY": -154,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": 1800,
          "y": 250
        },
        "angle": 0,
        "semanticKey": "scaffold",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/scaffold",
          "spriteX": 151,
          "spriteY": -841,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 1400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 13,
        "position": {
          "x": 650,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "drum2",
        "extension": {
          "tag": "drum2",
          "sprite": "leveldrum2/drum2x2",
          "spriteX": 51,
          "spriteY": -52,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 14,
        "position": {
          "x": 1750,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "taiko",
        "extension": {
          "tag": "taiko",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 15,
        "position": {
          "x": 900,
          "y": -450
        },
        "angle": 0,
        "semanticKey": "drum3",
        "extension": {
          "tag": "drum3",
          "sprite": "leveldrum2/drum2x3",
          "spriteX": 50,
          "spriteY": -78,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 150,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 450,
          "y": -550
        },
        "angle": 0,
        "semanticKey": "drum1",
        "extension": {
          "tag": "drum1",
          "sprite": "leveldrum2/drum2x1",
          "spriteX": 50,
          "spriteY": -28,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 17,
        "position": {
          "x": 1350,
          "y": -700
        },
        "angle": 0,
        "semanticKey": "drum2",
        "extension": {
          "tag": "drum2",
          "sprite": "leveldrum2/drum2x2",
          "spriteX": 51,
          "spriteY": -52,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 18,
        "position": {
          "x": 1708,
          "y": 659
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 700,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 19,
        "position": {
          "x": 1650,
          "y": -41
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 600,
          "height": 75,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 20,
        "position": {
          "x": 1809,
          "y": 107
        },
        "angle": 0,
        "semanticKey": "ground_l",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/ground_l",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 21,
        "position": {
          "x": 1948,
          "y": -964
        },
        "angle": 0,
        "semanticKey": "garland",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/garland",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 22,
        "position": {
          "x": 2106,
          "y": 107
        },
        "angle": 0,
        "semanticKey": "ground_r",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/ground_r",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 23,
        "position": {
          "x": 1123,
          "y": 425
        },
        "angle": 0,
        "semanticKey": "wave",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/wave",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2485,
          "slicedHeight": 346
        },
        "collider": null
      }
    ]
  },
  {
    "id": "leveldrum2",
    "sourceId": "leveldrum",
    "name": "太鼓",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 0,
    "minY": -1500,
    "width": 2200,
    "height": 2000,
    "editMinX": 100,
    "editMinY": -1400,
    "editWidth": 1700,
    "editHeight": 1500,
    "spawnX": 296,
    "spawnY": 50,
    "finishX": 1800,
    "finishY": -1150,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/leveldrum2.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/leveldrum2/leveldrum2.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/leveldrum2/leveldrum2.png",
    "skySprite": "leveldrum2/sky",
    "spriteAssets": {
      "leveldrum2/background": "/game/assets/pdzz/maps/leveldrum2/background.png",
      "leveldrum2/bell": "/game/assets/pdzz/maps/leveldrum2/bell.png",
      "leveldrum2/pattern": "/game/assets/pdzz/maps/leveldrum2/pattern.png",
      "leveldrum2/pole_l": "/game/assets/pdzz/maps/leveldrum2/pole_l.png",
      "leveldrum2/pole_r": "/game/assets/pdzz/maps/leveldrum2/pole_r.png",
      "leveldrum2/scaffold": "/game/assets/pdzz/maps/leveldrum2/scaffold.png",
      "leveldrum2/sky": "/game/assets/pdzz/maps/leveldrum2/sky.png",
      "leveldrum2/pole_v": "/game/assets/pdzz/maps/leveldrum2/frames/pole_v.png",
      "leveldrum2/pole_h": "/game/assets/pdzz/maps/leveldrum2/frames/pole_h.png",
      "leveldrum2/lantern": "/game/assets/pdzz/maps/leveldrum2/frames/lantern.png",
      "leveldrum2/drum4x6": "/game/assets/pdzz/maps/leveldrum2/frames/drum4x6.png",
      "leveldrum2/drum2x2": "/game/assets/pdzz/maps/leveldrum2/frames/drum2x2.png",
      "leveldrum2/drum2x3": "/game/assets/pdzz/maps/leveldrum2/frames/drum2x3.png",
      "leveldrum2/drum2x1": "/game/assets/pdzz/maps/leveldrum2/frames/drum2x1.png",
      "leveldrum2/ground_l": "/game/assets/pdzz/maps/leveldrum2/frames/ground_l.png",
      "leveldrum2/garland": "/game/assets/pdzz/maps/leveldrum2/frames/garland.png",
      "leveldrum2/ground_r": "/game/assets/pdzz/maps/leveldrum2/frames/ground_r.png",
      "leveldrum2/wave": "/game/assets/pdzz/maps/leveldrum2/frames/wave.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 282,
          "y": -268
        },
        "angle": 0,
        "semanticKey": "pole_l",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_l",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 51,
          "slicedHeight": 1550
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 499,
          "y": -258
        },
        "angle": 0,
        "semanticKey": "pole_v",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_v",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 12,
          "slicedHeight": 1500
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 705,
          "y": -263
        },
        "angle": 0,
        "semanticKey": "pole_v",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_v",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 12,
          "slicedHeight": 1500
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 951,
          "y": -266
        },
        "angle": 0,
        "semanticKey": "pole_v",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_v",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 12,
          "slicedHeight": 1500
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1400,
          "y": -274
        },
        "angle": 0,
        "semanticKey": "pole_v",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_v",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 12,
          "slicedHeight": 1500
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1091,
          "y": -598
        },
        "angle": 0,
        "semanticKey": "pattern",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pattern",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2390,
          "slicedHeight": 1610
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 1498,
          "y": -331
        },
        "angle": 0,
        "semanticKey": "pole_r",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_r",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 51,
          "slicedHeight": 1428
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1057,
          "y": -273
        },
        "angle": 0,
        "semanticKey": "background",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/background",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2474,
          "slicedHeight": 349
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 887,
          "y": -1015
        },
        "angle": 0,
        "semanticKey": "pole_h",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pole_h",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 1180,
          "slicedHeight": 28
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 1953,
          "y": -840
        },
        "angle": 0,
        "semanticKey": "lantern",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/lantern",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 150,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "drumgiant",
        "extension": {
          "tag": "drumgiant",
          "sprite": "leveldrum2/drum4x6",
          "spriteX": 101,
          "spriteY": -154,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": 1800,
          "y": 250
        },
        "angle": 0,
        "semanticKey": "scaffold",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/scaffold",
          "spriteX": 151,
          "spriteY": -841,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 1400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 13,
        "position": {
          "x": 650,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "drum2",
        "extension": {
          "tag": "drum2",
          "sprite": "leveldrum2/drum2x2",
          "spriteX": 51,
          "spriteY": -52,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 14,
        "position": {
          "x": 1750,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "taiko",
        "extension": {
          "tag": "taiko",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 15,
        "position": {
          "x": 900,
          "y": -450
        },
        "angle": 0,
        "semanticKey": "drum3",
        "extension": {
          "tag": "drum3",
          "sprite": "leveldrum2/drum2x3",
          "spriteX": 50,
          "spriteY": -78,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 150,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 450,
          "y": -550
        },
        "angle": 0,
        "semanticKey": "drum1",
        "extension": {
          "tag": "drum1",
          "sprite": "leveldrum2/drum2x1",
          "spriteX": 50,
          "spriteY": -28,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 17,
        "position": {
          "x": 1350,
          "y": -700
        },
        "angle": 0,
        "semanticKey": "drum2",
        "extension": {
          "tag": "drum2",
          "sprite": "leveldrum2/drum2x2",
          "spriteX": 51,
          "spriteY": -52,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 18,
        "position": {
          "x": 1708,
          "y": 659
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 700,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 19,
        "position": {
          "x": 1650,
          "y": -41
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 600,
          "height": 75,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 20,
        "position": {
          "x": 1809,
          "y": 107
        },
        "angle": 0,
        "semanticKey": "ground_l",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/ground_l",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 21,
        "position": {
          "x": 1948,
          "y": -964
        },
        "angle": 0,
        "semanticKey": "garland",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/garland",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 22,
        "position": {
          "x": 2106,
          "y": 107
        },
        "angle": 0,
        "semanticKey": "ground_r",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/ground_r",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 23,
        "position": {
          "x": 1123,
          "y": 425
        },
        "angle": 0,
        "semanticKey": "wave",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/wave",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2485,
          "slicedHeight": 346
        },
        "collider": null
      }
    ]
  },
  {
    "id": "leveldrumbattle",
    "sourceId": "leveldrumbattle",
    "name": "太鼓对战",
    "available": true,
    "supportTeamBattle": true,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 500,
    "minY": -1200,
    "width": 2800,
    "height": 1700,
    "editMinX": 500,
    "editMinY": -1100,
    "editWidth": 2800,
    "editHeight": 1200,
    "spawnX": 800,
    "spawnY": 50,
    "finishX": 3000,
    "finishY": 50,
    "secondarySpawnPoints": [
      {
        "x": 3000,
        "y": 50
      }
    ],
    "secondaryFinishPoints": [
      {
        "x": 800,
        "y": 50
      }
    ],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/leveldrumbattle.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/leveldrumbattle/leveldrumbattle.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/leveldrumbattle/leveldrumbattle.png",
    "skySprite": "leveldrum2/sky",
    "spriteAssets": {
      "leveldrum2/background": "/game/assets/pdzz/maps/leveldrumbattle/background.png",
      "leveldrum2/bell": "/game/assets/pdzz/maps/leveldrumbattle/bell.png",
      "leveldrum2/pattern": "/game/assets/pdzz/maps/leveldrumbattle/pattern.png",
      "leveldrum2/pole_l": "/game/assets/pdzz/maps/leveldrumbattle/pole_l.png",
      "leveldrum2/pole_r": "/game/assets/pdzz/maps/leveldrumbattle/pole_r.png",
      "leveldrum2/scaffold": "/game/assets/pdzz/maps/leveldrumbattle/scaffold.png",
      "leveldrum2/sky": "/game/assets/pdzz/maps/leveldrumbattle/sky.png",
      "leveldrum2/ground_l": "/game/assets/pdzz/maps/leveldrumbattle/frames/ground_l.png",
      "leveldrum2/ground_r": "/game/assets/pdzz/maps/leveldrumbattle/frames/ground_r.png",
      "leveldrum2/drum4x6": "/game/assets/pdzz/maps/leveldrumbattle/frames/drum4x6.png",
      "leveldrum2/wave": "/game/assets/pdzz/maps/leveldrumbattle/frames/wave.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1875,
          "y": -598
        },
        "angle": 0,
        "semanticKey": "pattern",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pattern",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 3900,
          "slicedHeight": 1610
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 1881,
          "y": -273
        },
        "angle": 0,
        "semanticKey": "background",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/background",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 3505,
          "slicedHeight": 349
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1801,
          "y": 107
        },
        "angle": 0,
        "semanticKey": "ground_l",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/ground_l",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 2026,
          "y": 107
        },
        "angle": 0,
        "semanticKey": "ground_r",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/ground_r",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 5,
        "position": {
          "x": 700,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "drumgiant",
        "extension": {
          "tag": "drumgiant",
          "sprite": "leveldrum2/drum4x6",
          "spriteX": 101,
          "spriteY": -154,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 2900,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "drumgiant",
        "extension": {
          "tag": "drumgiant",
          "sprite": "leveldrum2/drum4x6",
          "spriteX": 100,
          "spriteY": -154,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 1700,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "taiko",
        "extension": {
          "tag": "taiko",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": 1700,
          "y": 659
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 700,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 9,
        "position": {
          "x": 1650,
          "y": -41
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 500,
          "height": 75,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 1937,
          "y": 425
        },
        "angle": 0,
        "semanticKey": "wave",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/wave",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 3660,
          "slicedHeight": 346
        },
        "collider": null
      }
    ]
  },
  {
    "id": "leveldrumbattle2",
    "sourceId": "leveldrumbattle",
    "name": "太鼓对战",
    "available": true,
    "supportTeamBattle": true,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 500,
    "minY": -1200,
    "width": 2800,
    "height": 1700,
    "editMinX": 500,
    "editMinY": -1100,
    "editWidth": 2800,
    "editHeight": 1200,
    "spawnX": 800,
    "spawnY": 50,
    "finishX": 3000,
    "finishY": 50,
    "secondarySpawnPoints": [
      {
        "x": 3000,
        "y": 50
      }
    ],
    "secondaryFinishPoints": [
      {
        "x": 800,
        "y": 50
      }
    ],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/leveldrumbattle2.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/leveldrumbattle2/leveldrumbattle2.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/leveldrumbattle2/leveldrumbattle2.png",
    "skySprite": "leveldrum2/sky",
    "spriteAssets": {
      "leveldrum2/background": "/game/assets/pdzz/maps/leveldrumbattle2/background.png",
      "leveldrum2/bell": "/game/assets/pdzz/maps/leveldrumbattle2/bell.png",
      "leveldrum2/pattern": "/game/assets/pdzz/maps/leveldrumbattle2/pattern.png",
      "leveldrum2/pole_l": "/game/assets/pdzz/maps/leveldrumbattle2/pole_l.png",
      "leveldrum2/pole_r": "/game/assets/pdzz/maps/leveldrumbattle2/pole_r.png",
      "leveldrum2/scaffold": "/game/assets/pdzz/maps/leveldrumbattle2/scaffold.png",
      "leveldrum2/sky": "/game/assets/pdzz/maps/leveldrumbattle2/sky.png",
      "leveldrum2/ground_l": "/game/assets/pdzz/maps/leveldrumbattle2/frames/ground_l.png",
      "leveldrum2/ground_r": "/game/assets/pdzz/maps/leveldrumbattle2/frames/ground_r.png",
      "leveldrum2/drum4x6": "/game/assets/pdzz/maps/leveldrumbattle2/frames/drum4x6.png",
      "leveldrum2/wave": "/game/assets/pdzz/maps/leveldrumbattle2/frames/wave.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1875,
          "y": -598
        },
        "angle": 0,
        "semanticKey": "pattern",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/pattern",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 3900,
          "slicedHeight": 1610
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 1881,
          "y": -273
        },
        "angle": 0,
        "semanticKey": "background",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/background",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 3505,
          "slicedHeight": 349
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1801,
          "y": 107
        },
        "angle": 0,
        "semanticKey": "ground_l",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/ground_l",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 2026,
          "y": 107
        },
        "angle": 0,
        "semanticKey": "ground_r",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/ground_r",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 5,
        "position": {
          "x": 700,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "drumgiant",
        "extension": {
          "tag": "drumgiant",
          "sprite": "leveldrum2/drum4x6",
          "spriteX": 101,
          "spriteY": -154,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 2900,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "drumgiant",
        "extension": {
          "tag": "drumgiant",
          "sprite": "leveldrum2/drum4x6",
          "spriteX": 100,
          "spriteY": -154,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 1700,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "taiko",
        "extension": {
          "tag": "taiko",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": 1700,
          "y": 659
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 700,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 9,
        "position": {
          "x": 1650,
          "y": -41
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 500,
          "height": 75,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 1937,
          "y": 425
        },
        "angle": 0,
        "semanticKey": "wave",
        "extension": {
          "tag": "",
          "sprite": "leveldrum2/wave",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 3660,
          "slicedHeight": 346
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelfarm",
    "sourceId": "levelfarm",
    "name": "西部",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 200,
    "minY": -1300,
    "width": 1800,
    "height": 1700,
    "editMinX": 300,
    "editMinY": -1100,
    "editWidth": 1700,
    "editHeight": 1200,
    "spawnX": 617,
    "spawnY": -100,
    "finishX": 1800,
    "finishY": -600,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelfarm.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelfarm/levelfarm.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelfarm/levelfarm.png",
    "skySprite": "levelfarm/bluesky",
    "spriteAssets": {
      "levelfarm/cloud": "/game/assets/pdzz/maps/levelfarm/cloud.png",
      "levelfarm/foreground": "/game/assets/pdzz/maps/levelfarm/foreground.png",
      "levelfarm/ground": "/game/assets/pdzz/maps/levelfarm/frames/ground.png",
      "levelfarm/house": "/game/assets/pdzz/maps/levelfarm/house.png",
      "levelfarm/bluesky": "/game/assets/pdzz/maps/levelfarm/frames/bluesky.png",
      "levelfarm/cloud2": "/game/assets/pdzz/maps/levelfarm/frames/cloud2.png",
      "levelfarm/cloud1": "/game/assets/pdzz/maps/levelfarm/frames/cloud1.png",
      "levelfarm/windmill": "/game/assets/pdzz/maps/levelfarm/frames/windmill.png",
      "levelfarm/mower_body": "/game/assets/pdzz/maps/levelfarm/frames/mower_body.png",
      "levelfarm/crate": "/game/assets/pdzz/maps/levelfarm/frames/crate.png",
      "levelfarm/mower_tyre": "/game/assets/pdzz/maps/levelfarm/frames/mower_tyre.png",
      "levelfarm/groundspikes": "/game/assets/pdzz/maps/levelfarm/frames/groundspikes.png",
      "levelfarm/mower_saw": "/game/assets/pdzz/maps/levelfarm/frames/mower_saw.png",
      "levelfarm/mower_spikes": "/game/assets/pdzz/maps/levelfarm/frames/mower_spikes.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1914,
          "y": -973
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 562,
          "y": -894
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1163,
          "y": -269
        },
        "angle": 0,
        "semanticKey": "cloud",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/cloud",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 4,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1744,
          "y": -505
        },
        "angle": 0,
        "semanticKey": "windmill",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/windmill",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1149,
          "y": 200
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/ground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2430,
          "slicedHeight": 407
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 1150,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mower",
        "extension": {
          "tag": "mower",
          "sprite": "levelfarm/mower_body",
          "spriteX": 24,
          "spriteY": -51,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 551,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "crate",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/crate",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 651,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "crate",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/crate",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 1776,
          "y": -298
        },
        "angle": 0,
        "semanticKey": "house",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/house",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 1158,
          "y": -12
        },
        "angle": 0,
        "semanticKey": "mower_tyre",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/mower_tyre",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 1222,
          "y": -12
        },
        "angle": 0,
        "semanticKey": "mower_tyre",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/mower_tyre",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 12,
        "position": {
          "x": 1419,
          "y": -51
        },
        "angle": 0,
        "semanticKey": "groundspikes",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/groundspikes",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 1131,
          "y": -67
        },
        "angle": 0,
        "semanticKey": "mower_saw",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/mower_saw",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.1111111640930176,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 14,
        "position": {
          "x": 1147,
          "y": 163
        },
        "angle": 0,
        "semanticKey": "foreground",
        "extension": {
          "tag": "",
          "sprite": "levelfarm/foreground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 15,
        "position": {
          "x": 100,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2300,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 1250,
          "y": 11
        },
        "angle": 0,
        "semanticKey": "mowerhopper",
        "extension": {
          "tag": "mowerhopper",
          "sprite": "levelfarm/mower_spikes",
          "spriteX": 1,
          "spriteY": -62,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 40,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 17,
        "position": {
          "x": 1100,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mowersaw",
        "extension": {
          "tag": "mowersaw",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 105,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 18,
        "position": {
          "x": 500,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 19,
        "position": {
          "x": 1300,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 250,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 20,
        "position": {
          "x": 600,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 21,
        "position": {
          "x": 1550,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 600,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 22,
        "position": {
          "x": 1252,
          "y": -44
        },
        "angle": 0,
        "semanticKey": "mowerspike",
        "extension": {
          "tag": "mowerspike",
          "sprite": "levelfarm/mower_spikes",
          "spriteX": 0,
          "spriteY": -7,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 23,
        "position": {
          "x": 1350,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "levelfarmbattle",
    "sourceId": "levelfarmbattle",
    "name": "西部对战",
    "available": true,
    "supportTeamBattle": true,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 200,
    "minY": -1300,
    "width": 2200,
    "height": 1700,
    "editMinX": 300,
    "editMinY": -1100,
    "editWidth": 2000,
    "editHeight": 1200,
    "spawnX": 600,
    "spawnY": -100,
    "finishX": 2000,
    "finishY": -100,
    "secondarySpawnPoints": [
      {
        "x": 2000,
        "y": -100
      }
    ],
    "secondaryFinishPoints": [
      {
        "x": 600,
        "y": -100
      }
    ],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelfarmbattle.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelfarmbattle/levelfarmbattle.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelfarmbattle/levelfarmbattle.png",
    "skySprite": "levelfarmbattle/bluesky",
    "spriteAssets": {
      "levelfarmbattle/cloud": "/game/assets/pdzz/maps/levelfarmbattle/cloud.png",
      "levelfarmbattle/foreground": "/game/assets/pdzz/maps/levelfarmbattle/foreground.png",
      "levelfarmbattle/house": "/game/assets/pdzz/maps/levelfarmbattle/house.png",
      "levelfarmbattle/bluesky": "/game/assets/pdzz/maps/levelfarmbattle/frames/bluesky.png",
      "levelfarmbattle/cloud2": "/game/assets/pdzz/maps/levelfarmbattle/frames/cloud2.png",
      "levelfarmbattle/cloud1": "/game/assets/pdzz/maps/levelfarmbattle/frames/cloud1.png",
      "levelfarmbattle/windmill": "/game/assets/pdzz/maps/levelfarmbattle/frames/windmill.png",
      "levelfarmbattle/ground": "/game/assets/pdzz/maps/levelfarmbattle/frames/ground.png",
      "levelfarmbattle/mower_body": "/game/assets/pdzz/maps/levelfarmbattle/frames/mower_body.png",
      "levelfarmbattle/crate": "/game/assets/pdzz/maps/levelfarmbattle/frames/crate.png",
      "levelfarmbattle/groundspikes": "/game/assets/pdzz/maps/levelfarmbattle/frames/groundspikes.png",
      "levelfarmbattle/mower_saw": "/game/assets/pdzz/maps/levelfarmbattle/frames/mower_saw.png",
      "levelfarmbattle/mower_spikes": "/game/assets/pdzz/maps/levelfarmbattle/frames/mower_spikes.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1914,
          "y": -973
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 562,
          "y": -894
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1305,
          "y": -269
        },
        "angle": 0,
        "semanticKey": "cloud",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/cloud",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 4,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 42,
          "y": -505
        },
        "angle": 0,
        "semanticKey": "windmill",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/windmill",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 2494,
          "y": -505
        },
        "angle": 0,
        "semanticKey": "windmill",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/windmill",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1149,
          "y": 200
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/ground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2700,
          "slicedHeight": 407
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 1150,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mower_l",
        "extension": {
          "tag": "mower_l",
          "sprite": "levelfarmbattle/mower_body",
          "spriteX": 24,
          "spriteY": -51,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": 1350,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mower_r",
        "extension": {
          "tag": "mower_r",
          "sprite": "levelfarmbattle/mower_body",
          "spriteX": 77,
          "spriteY": -51,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 2053,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "crate",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/crate",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 551,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "crate",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/crate",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 1953,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "crate",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/crate",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 12,
        "position": {
          "x": 651,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "crate",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/crate",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 2526,
          "y": -298
        },
        "angle": 0,
        "semanticKey": "house",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/house",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 14,
        "position": {
          "x": 74,
          "y": -298
        },
        "angle": 0,
        "semanticKey": "house",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/house",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 15,
        "position": {
          "x": 276,
          "y": -51
        },
        "angle": 0,
        "semanticKey": "groundspikes",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/groundspikes",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 16,
        "position": {
          "x": 2322,
          "y": -51
        },
        "angle": 0,
        "semanticKey": "groundspikes",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/groundspikes",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 17,
        "position": {
          "x": 1131,
          "y": -67
        },
        "angle": 0,
        "semanticKey": "mower_saw",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/mower_saw",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.1111111640930176,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 18,
        "position": {
          "x": 1470,
          "y": -67
        },
        "angle": 0,
        "semanticKey": "mower_saw",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/mower_saw",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.1111111640930176,
          "flipX": true,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 19,
        "position": {
          "x": 1147,
          "y": 217
        },
        "angle": 0,
        "semanticKey": "foreground",
        "extension": {
          "tag": "",
          "sprite": "levelfarmbattle/foreground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2.5999999046325684,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 20,
        "position": {
          "x": 2200,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 21,
        "position": {
          "x": 200,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 22,
        "position": {
          "x": 100,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2300,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 23,
        "position": {
          "x": 1250,
          "y": 11
        },
        "angle": 0,
        "semanticKey": "mowerhopper_l",
        "extension": {
          "tag": "mowerhopper_l",
          "sprite": "levelfarmbattle/mower_spikes",
          "spriteX": 1,
          "spriteY": -62,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 40,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 24,
        "position": {
          "x": 1300,
          "y": 11
        },
        "angle": 0,
        "semanticKey": "mowerhopper_r",
        "extension": {
          "tag": "mowerhopper_r",
          "sprite": "levelfarmbattle/mower_spikes",
          "spriteX": 50,
          "spriteY": -62,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 40,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 25,
        "position": {
          "x": 500,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 26,
        "position": {
          "x": 1100,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mowersaw_l",
        "extension": {
          "tag": "mowersaw_l",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 105,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 27,
        "position": {
          "x": 2300,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 600,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 28,
        "position": {
          "x": 1900,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 29,
        "position": {
          "x": 1450,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mowersaw_r",
        "extension": {
          "tag": "mowersaw_r",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 105,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 30,
        "position": {
          "x": -150,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 600,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 31,
        "position": {
          "x": 1298,
          "y": -44
        },
        "angle": 0,
        "semanticKey": "mowerspike_r",
        "extension": {
          "tag": "mowerspike_r",
          "sprite": "levelfarmbattle/mower_spikes",
          "spriteX": 52,
          "spriteY": -7,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 32,
        "position": {
          "x": 1252,
          "y": -44
        },
        "angle": 0,
        "semanticKey": "mowerspike_l",
        "extension": {
          "tag": "mowerspike_l",
          "sprite": "levelfarmbattle/mower_spikes",
          "spriteX": 0,
          "spriteY": -7,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "levelfootball",
    "sourceId": "levelfootball",
    "name": "足球大战",
    "available": true,
    "supportTeamBattle": true,
    "supportAIBattle": false,
    "noFlag": true,
    "minX": 300,
    "minY": -1700,
    "width": 1500,
    "height": 2400,
    "editMinX": 300,
    "editMinY": -950,
    "editWidth": 1500,
    "editHeight": 950,
    "spawnX": 700,
    "spawnY": 0,
    "finishX": 1600,
    "finishY": 0,
    "secondarySpawnPoints": [
      {
        "x": 1400,
        "y": 0
      }
    ],
    "secondaryFinishPoints": [
      {
        "x": 450,
        "y": 0
      }
    ],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelfootball.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelfootball/levelfootball.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelfootball/levelfootball.png",
    "skySprite": "levelfootball/sky",
    "spriteAssets": {
      "levelfootball/sky": "/game/assets/pdzz/maps/levelfootball/sky.png",
      "levelfootball/spotlight": "/game/assets/pdzz/maps/levelfootball/spotlight.png",
      "levelfootball/stage": "/game/assets/pdzz/maps/levelfootball/stage.png",
      "levelfootball/scaffold": "/game/assets/pdzz/maps/levelfootball/frames/scaffold.png",
      "levelfootball/ad": "/game/assets/pdzz/maps/levelfootball/frames/ad.png",
      "levelfootball/ground": "/game/assets/pdzz/maps/levelfootball/frames/ground.png",
      "levelfootball/ball": "/game/assets/pdzz/maps/levelfootball/frames/ball.png",
      "levelfootball/goalleft": "/game/assets/pdzz/maps/levelfootball/frames/goalleft.png",
      "levelfootball/goalright": "/game/assets/pdzz/maps/levelfootball/frames/goalright.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1061,
          "y": -274
        },
        "angle": 0,
        "semanticKey": "stage",
        "extension": {
          "tag": "",
          "sprite": "levelfootball/stage",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 474,
          "y": -596
        },
        "angle": 90,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelfootball/scaffold",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 620,
          "slicedHeight": 51
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1627,
          "y": -596
        },
        "angle": 90,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelfootball/scaffold",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 620,
          "slicedHeight": 51
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 4,
        "position": {
          "x": 200,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "goalRed",
        "extension": {
          "tag": "goalRed",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 5,
        "position": {
          "x": 1700,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "goalBlue",
        "extension": {
          "tag": "goalBlue",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 1600,
          "y": -300
        },
        "angle": 0,
        "semanticKey": "rightwall",
        "extension": {
          "tag": "rightwall",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 800,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 100,
          "y": -300
        },
        "angle": 0,
        "semanticKey": "leftwall",
        "extension": {
          "tag": "leftwall",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 800,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1054,
          "y": -693
        },
        "angle": 0,
        "semanticKey": "ad",
        "extension": {
          "tag": "",
          "sprite": "levelfootball/ad",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 1073,
          "y": 362
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "",
          "sprite": "levelfootball/ground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2211,
          "slicedHeight": 732
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 1047,
          "y": -513
        },
        "angle": 0,
        "semanticKey": "spotlight",
        "extension": {
          "tag": "",
          "sprite": "levelfootball/spotlight",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 50,
          "y": 300
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "ground",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2100,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": -76,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "goalbackl",
        "extension": {
          "tag": "goalbackl",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 13,
        "position": {
          "x": 1025,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mushroom",
        "extension": {
          "tag": "mushroom",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 14,
        "position": {
          "x": 1873,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "goalbackr",
        "extension": {
          "tag": "goalbackr",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 15,
        "position": {
          "x": 1050,
          "y": -250
        },
        "angle": 0,
        "semanticKey": "ball",
        "extension": {
          "tag": "ball",
          "sprite": "levelfootball/ball",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 50,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 450,
          "y": -850
        },
        "angle": 0,
        "semanticKey": "topwall",
        "extension": {
          "tag": "topwall",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1300,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 17,
        "position": {
          "x": 1049,
          "y": -875
        },
        "angle": 0,
        "semanticKey": "scaffold",
        "extension": {
          "tag": "",
          "sprite": "levelfootball/scaffold",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 1113,
          "slicedHeight": 54
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 18,
        "position": {
          "x": 350,
          "y": -150
        },
        "angle": 0,
        "semanticKey": "goalleft",
        "extension": {
          "tag": "",
          "sprite": "levelfootball/goalleft",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 19,
        "position": {
          "x": 1750,
          "y": -150
        },
        "angle": 0,
        "semanticKey": "goalright",
        "extension": {
          "tag": "",
          "sprite": "levelfootball/goalright",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelforest",
    "sourceId": "levelforest",
    "name": "森林",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 350,
    "minY": -2050,
    "width": 1050,
    "height": 2600,
    "editMinX": 550,
    "editMinY": -1600,
    "editWidth": 700,
    "editHeight": 1850,
    "spawnX": 1073,
    "spawnY": 100,
    "finishX": 929,
    "finishY": -1379,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelforest.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelforest/levelforest.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelforest/levelforest.png",
    "skySprite": "levelforest/sky",
    "spriteAssets": {
      "levelforest/foliage1": "/game/assets/pdzz/maps/levelforest/foliage1.png",
      "levelforest/foliage2": "/game/assets/pdzz/maps/levelforest/foliage2.png",
      "levelforest/foliage3": "/game/assets/pdzz/maps/levelforest/foliage3.png",
      "levelforest/tree_foreground": "/game/assets/pdzz/maps/levelforest/frames/tree_foreground.png",
      "levelforest/sky": "/game/assets/pdzz/maps/levelforest/frames/sky.png",
      "levelforest/tree_background2": "/game/assets/pdzz/maps/levelforest/frames/tree_background2.png",
      "levelforest/tree_background1": "/game/assets/pdzz/maps/levelforest/frames/tree_background1.png",
      "levelforest/tree": "/game/assets/pdzz/maps/levelforest/frames/tree.png",
      "levelforest/branch1": "/game/assets/pdzz/maps/levelforest/frames/branch1.png",
      "levelforest/branchplatform1": "/game/assets/pdzz/maps/levelforest/frames/branchplatform1.png",
      "levelforest/branch2": "/game/assets/pdzz/maps/levelforest/frames/branch2.png",
      "levelforest/branch3": "/game/assets/pdzz/maps/levelforest/frames/branch3.png",
      "levelforest/platform_crack_l": "/game/assets/pdzz/maps/levelforest/frames/platform_crack_l.png",
      "levelforest/platform_crack_r": "/game/assets/pdzz/maps/levelforest/frames/platform_crack_r.png",
      "levelforest/branchplatform4": "/game/assets/pdzz/maps/levelforest/frames/branchplatform4.png",
      "levelforest/branchplatform2": "/game/assets/pdzz/maps/levelforest/frames/branchplatform2.png",
      "levelforest/branchplatform3": "/game/assets/pdzz/maps/levelforest/frames/branchplatform3.png",
      "levelforest/platform_l": "/game/assets/pdzz/maps/levelforest/frames/platform_l.png",
      "levelforest/platform_s": "/game/assets/pdzz/maps/levelforest/frames/platform_s.png",
      "levelforest/platform_m": "/game/assets/pdzz/maps/levelforest/frames/platform_m.png",
      "levelforest/platform_rainbow": "/game/assets/pdzz/maps/levelforest/frames/platform_rainbow.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 868,
          "y": -541
        },
        "angle": 0,
        "semanticKey": "tree_background2",
        "extension": {
          "tag": "",
          "sprite": "levelforest/tree_background2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 69,
          "slicedHeight": 2444
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 477,
          "y": -567
        },
        "angle": 0,
        "semanticKey": "tree_background2",
        "extension": {
          "tag": "",
          "sprite": "levelforest/tree_background2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 69,
          "slicedHeight": 2503
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 894,
          "y": -1071
        },
        "angle": 0,
        "semanticKey": "foliage2",
        "extension": {
          "tag": "",
          "sprite": "levelforest/foliage2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.232200026512146,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.3764705955982208,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1096,
          "y": -335
        },
        "angle": 0,
        "semanticKey": "tree_background1",
        "extension": {
          "tag": "",
          "sprite": "levelforest/tree_background1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.3490196168422699,
          "isSliced": true,
          "slicedWidth": 91,
          "slicedHeight": 2160
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 774,
          "y": -1460
        },
        "angle": 0,
        "semanticKey": "foliage3",
        "extension": {
          "tag": "",
          "sprite": "levelforest/foliage3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.4285714626312256,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.7960784435272217,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1308,
          "y": -658
        },
        "angle": 0,
        "semanticKey": "tree",
        "extension": {
          "tag": "",
          "sprite": "levelforest/tree",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 371,
          "slicedHeight": 2668
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 695,
          "y": -658
        },
        "angle": 0,
        "semanticKey": "tree",
        "extension": {
          "tag": "",
          "sprite": "levelforest/tree",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 237,
          "slicedHeight": 2641
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1055,
          "y": -159
        },
        "angle": 0,
        "semanticKey": "branch1",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branch1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 810,
          "y": -992
        },
        "angle": 0,
        "semanticKey": "branchplatform1",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branchplatform1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 0.7237899899482727,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 841,
          "y": 248
        },
        "angle": 0,
        "semanticKey": "branch2",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branch2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 554,
          "y": -25
        },
        "angle": 0,
        "semanticKey": "branch2",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branch2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 12,
        "position": {
          "x": 571,
          "y": -501
        },
        "angle": 0,
        "semanticKey": "branch3",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branch3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 846,
          "y": -525
        },
        "angle": 0,
        "semanticKey": "branch2",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branch2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 14,
        "position": {
          "x": 591,
          "y": -859
        },
        "angle": 0,
        "semanticKey": "branch1",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branch1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 15,
        "position": {
          "x": 1139,
          "y": -1127
        },
        "angle": 0,
        "semanticKey": "branch3",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branch3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 16,
        "position": {
          "x": 526,
          "y": -1547
        },
        "angle": 0,
        "semanticKey": "branch1",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branch1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 17,
        "position": {
          "x": 846,
          "y": -1589
        },
        "angle": 0,
        "semanticKey": "branch2",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branch2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.7651000022888184,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 18,
        "position": {
          "x": 1063,
          "y": -1647
        },
        "angle": 0,
        "semanticKey": "branch1",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branch1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 19,
        "position": {
          "x": 753,
          "y": -1048
        },
        "angle": 0,
        "semanticKey": "platform_crack_l",
        "extension": {
          "tag": "",
          "sprite": "levelforest/platform_crack_l",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 20,
        "position": {
          "x": 841,
          "y": -1048
        },
        "angle": 0,
        "semanticKey": "platform_crack_r",
        "extension": {
          "tag": "",
          "sprite": "levelforest/platform_crack_r",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 21,
        "position": {
          "x": 1078,
          "y": 212
        },
        "angle": 0,
        "semanticKey": "branchplatform4",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branchplatform4",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 22,
        "position": {
          "x": 1130,
          "y": 27
        },
        "angle": 0,
        "semanticKey": "branchplatform2",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branchplatform2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 23,
        "position": {
          "x": 1249,
          "y": -126
        },
        "angle": 0,
        "semanticKey": "branchplatform3",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branchplatform3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 24,
        "position": {
          "x": 1152,
          "y": -328
        },
        "angle": 0,
        "semanticKey": "branchplatform3",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branchplatform3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 25,
        "position": {
          "x": 1160,
          "y": -728
        },
        "angle": 0,
        "semanticKey": "branchplatform2",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branchplatform2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 26,
        "position": {
          "x": 1179,
          "y": -905
        },
        "angle": 0,
        "semanticKey": "branchplatform1",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branchplatform1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 27,
        "position": {
          "x": 630,
          "y": -1145
        },
        "angle": 0,
        "semanticKey": "branchplatform2",
        "extension": {
          "tag": "",
          "sprite": "levelforest/branchplatform2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 28,
        "position": {
          "x": 950,
          "y": 135
        },
        "angle": 0,
        "semanticKey": "platform_l",
        "extension": {
          "tag": "",
          "sprite": "levelforest/platform_l",
          "spriteX": 125,
          "spriteY": -9,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 250,
          "height": 35,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      },
      {
        "id": "boxcollider",
        "index": 29,
        "position": {
          "x": 1050,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "platform_s",
        "extension": {
          "tag": "",
          "sprite": "levelforest/platform_s",
          "spriteX": 74,
          "spriteY": -11,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 150,
          "height": 25,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      },
      {
        "id": "boxcollider",
        "index": 30,
        "position": {
          "x": 1200,
          "y": -156
        },
        "angle": 0,
        "semanticKey": "platform_m",
        "extension": {
          "tag": "",
          "sprite": "levelforest/platform_m",
          "spriteX": 49,
          "spriteY": -11,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 35,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      },
      {
        "id": "boxcollider",
        "index": 31,
        "position": {
          "x": 500,
          "y": -335
        },
        "angle": 0,
        "semanticKey": "rainbow1",
        "extension": {
          "tag": "rainbow1",
          "sprite": "levelforest/platform_rainbow",
          "spriteX": 83,
          "spriteY": 15,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 170,
          "height": 25,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      },
      {
        "id": "boxcollider",
        "index": 32,
        "position": {
          "x": 1100,
          "y": -357
        },
        "angle": 0,
        "semanticKey": "platform_m",
        "extension": {
          "tag": "",
          "sprite": "levelforest/platform_m",
          "spriteX": 49,
          "spriteY": -11,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 35,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      },
      {
        "id": "boxcollider",
        "index": 33,
        "position": {
          "x": 750,
          "y": -677
        },
        "angle": 0,
        "semanticKey": "rainbow2",
        "extension": {
          "tag": "rainbow2",
          "sprite": "levelforest/platform_rainbow",
          "spriteX": 83,
          "spriteY": 15,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 170,
          "height": 25,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      },
      {
        "id": "boxcollider",
        "index": 34,
        "position": {
          "x": 1100,
          "y": -758
        },
        "angle": 0,
        "semanticKey": "platform_m",
        "extension": {
          "tag": "",
          "sprite": "levelforest/platform_m",
          "spriteX": 49,
          "spriteY": -11,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 35,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      },
      {
        "id": "boxcollider",
        "index": 35,
        "position": {
          "x": 1050,
          "y": -955
        },
        "angle": 0,
        "semanticKey": "platform_l",
        "extension": {
          "tag": "",
          "sprite": "levelforest/platform_l",
          "spriteX": 123,
          "spriteY": -11,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 250,
          "height": 35,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      },
      {
        "id": "boxcollider",
        "index": 36,
        "position": {
          "x": 700,
          "y": -1029
        },
        "angle": 0,
        "semanticKey": "crack",
        "extension": {
          "tag": "crack",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 190,
          "height": 35,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      },
      {
        "id": "boxcollider",
        "index": 37,
        "position": {
          "x": 550,
          "y": -1172
        },
        "angle": 0,
        "semanticKey": "platform_s",
        "extension": {
          "tag": "",
          "sprite": "levelforest/platform_s",
          "spriteX": 74,
          "spriteY": -11,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 150,
          "height": 25,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      },
      {
        "id": "boxcollider",
        "index": 38,
        "position": {
          "x": 850,
          "y": -1350
        },
        "angle": 0,
        "semanticKey": "rainbowtop",
        "extension": {
          "tag": "rainbowtop",
          "sprite": "levelforest/platform_rainbow",
          "spriteX": 83,
          "spriteY": 15,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 170,
          "height": 25,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      },
      {
        "id": "scene",
        "index": 39,
        "position": {
          "x": 878,
          "y": -1834
        },
        "angle": 0,
        "semanticKey": "foliage1",
        "extension": {
          "tag": "",
          "sprite": "levelforest/foliage1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.4605714082717896,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 40,
        "position": {
          "x": 1273,
          "y": -489
        },
        "angle": 0,
        "semanticKey": "tree_foreground",
        "extension": {
          "tag": "",
          "sprite": "levelforest/tree_foreground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2.638000011444092,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelhaystack2",
    "sourceId": "levelhaystack",
    "name": "草垛",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": true,
    "noFlag": false,
    "minX": 50,
    "minY": -1300,
    "width": 2150,
    "height": 1700,
    "editMinX": 100,
    "editMinY": -1100,
    "editWidth": 2000,
    "editHeight": 1200,
    "spawnX": 393,
    "spawnY": 0,
    "finishX": 1871,
    "finishY": 0,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelhaystack2.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelhaystack2/levelhaystack2.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelhaystack2/levelhaystack2.png",
    "skySprite": "levelhaystack2/sky",
    "spriteAssets": {
      "levelhaystack2/cloud": "/game/assets/pdzz/maps/levelhaystack2/cloud.png",
      "levelhaystack2/ground": "/game/assets/pdzz/maps/levelhaystack2/ground.png",
      "levelhaystack2/haystack": "/game/assets/pdzz/maps/levelhaystack2/haystack.png",
      "levelhaystack2/sky": "/game/assets/pdzz/maps/levelhaystack2/sky.png",
      "levelhaystack2/cloud2": "/game/assets/pdzz/maps/levelhaystack2/frames/cloud2.png",
      "levelhaystack2/cloud1": "/game/assets/pdzz/maps/levelhaystack2/frames/cloud1.png",
      "levelhaystack2/cloud3": "/game/assets/pdzz/maps/levelhaystack2/frames/cloud3.png",
      "levelhaystack2/grassback": "/game/assets/pdzz/maps/levelhaystack2/frames/grassback.png",
      "levelhaystack2/scarecrow": "/game/assets/pdzz/maps/levelhaystack2/frames/scarecrow.png",
      "levelhaystack2/grassh1": "/game/assets/pdzz/maps/levelhaystack2/frames/grassh1.png",
      "levelhaystack2/grasss1": "/game/assets/pdzz/maps/levelhaystack2/frames/grasss1.png",
      "levelhaystack2/grassm1": "/game/assets/pdzz/maps/levelhaystack2/frames/grassm1.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1914,
          "y": -1234
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 928,
          "y": -802
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 0.8013225197792053,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 272,
          "y": -1067
        },
        "angle": 0,
        "semanticKey": "cloud3",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/cloud3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 0.6658599972724915,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1120,
          "y": -19
        },
        "angle": 0,
        "semanticKey": "cloud",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/cloud",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.686274528503418,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 2096,
          "y": -18
        },
        "angle": 0,
        "semanticKey": "grassback",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassback",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1098,
          "y": -150
        },
        "angle": 0,
        "semanticKey": "haystack",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/haystack",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 1000,
          "y": 2
        },
        "angle": 8,
        "semanticKey": "scarecrow",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/scarecrow",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1517,
          "y": -8
        },
        "angle": 0,
        "semanticKey": "grassh1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassh1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 1750,
          "y": -26
        },
        "angle": 0,
        "semanticKey": "grassh1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassh1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 1972,
          "y": -27
        },
        "angle": 0,
        "semanticKey": "grassh1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassh1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 10,
        "position": {
          "x": -50,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2300,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 800,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 600,
          "height": 200,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": 850,
          "y": -200
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 500,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 17,
        "position": {
          "x": 190,
          "y": -20
        },
        "angle": 0,
        "semanticKey": "grasss1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grasss1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 18,
        "position": {
          "x": 140,
          "y": -20
        },
        "angle": 0,
        "semanticKey": "grassback",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassback",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 19,
        "position": {
          "x": 681,
          "y": -21
        },
        "angle": 0,
        "semanticKey": "grassh1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassh1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 20,
        "position": {
          "x": 436,
          "y": -23
        },
        "angle": 0,
        "semanticKey": "grassh1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassh1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 21,
        "position": {
          "x": 1004,
          "y": -42
        },
        "angle": 0,
        "semanticKey": "grassm1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassm1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 22,
        "position": {
          "x": 1088,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/ground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2895,
          "slicedHeight": 830
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelhaystackbattle2",
    "sourceId": "levelhaystackbattle",
    "name": "草垛对战",
    "available": true,
    "supportTeamBattle": true,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 0,
    "minY": -1300,
    "width": 2200,
    "height": 1700,
    "editMinX": 100,
    "editMinY": -1100,
    "editWidth": 2000,
    "editHeight": 1200,
    "spawnX": 350,
    "spawnY": 0,
    "finishX": 1850,
    "finishY": 0,
    "secondarySpawnPoints": [
      {
        "x": 1850,
        "y": 0
      }
    ],
    "secondaryFinishPoints": [
      {
        "x": 350,
        "y": 0
      }
    ],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelhaystackbattle2.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelhaystackbattle2/levelhaystackbattle2.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelhaystackbattle2/levelhaystackbattle2.png",
    "skySprite": "levelhaystack2/sky",
    "spriteAssets": {
      "levelhaystack2/cloud": "/game/assets/pdzz/maps/levelhaystackbattle2/cloud.png",
      "levelhaystack2/ground": "/game/assets/pdzz/maps/levelhaystackbattle2/ground.png",
      "levelhaystack2/haystack": "/game/assets/pdzz/maps/levelhaystackbattle2/haystack.png",
      "levelhaystack2/sky": "/game/assets/pdzz/maps/levelhaystackbattle2/sky.png",
      "levelhaystack2/cloud2": "/game/assets/pdzz/maps/levelhaystackbattle2/frames/cloud2.png",
      "levelhaystack2/cloud1": "/game/assets/pdzz/maps/levelhaystackbattle2/frames/cloud1.png",
      "levelhaystack2/cloud3": "/game/assets/pdzz/maps/levelhaystackbattle2/frames/cloud3.png",
      "levelhaystack2/scarecrow": "/game/assets/pdzz/maps/levelhaystackbattle2/frames/scarecrow.png",
      "levelhaystack2/grasss1": "/game/assets/pdzz/maps/levelhaystackbattle2/frames/grasss1.png",
      "levelhaystack2/grassh1": "/game/assets/pdzz/maps/levelhaystackbattle2/frames/grassh1.png",
      "levelhaystack2/grassm1": "/game/assets/pdzz/maps/levelhaystackbattle2/frames/grassm1.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1914,
          "y": -1211
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 928,
          "y": -802
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 0.80131995677948,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 272,
          "y": -1067
        },
        "angle": 0,
        "semanticKey": "cloud3",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/cloud3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 0.6658599972724915,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1120,
          "y": -19
        },
        "angle": 0,
        "semanticKey": "cloud",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/cloud",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.686274528503418,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1098,
          "y": -150
        },
        "angle": 0,
        "semanticKey": "haystack",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/haystack",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1000,
          "y": 2
        },
        "angle": 8,
        "semanticKey": "scarecrow",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/scarecrow",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 1517,
          "y": -18
        },
        "angle": 0,
        "semanticKey": "grasss1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grasss1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 687,
          "y": -18
        },
        "angle": 0,
        "semanticKey": "grasss1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grasss1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 1750,
          "y": -26
        },
        "angle": 0,
        "semanticKey": "grassh1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassh1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 453,
          "y": -26
        },
        "angle": 0,
        "semanticKey": "grassh1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassh1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 240,
          "y": -34
        },
        "angle": 0,
        "semanticKey": "grassh1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassh1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 12,
        "position": {
          "x": 1972,
          "y": -34
        },
        "angle": 0,
        "semanticKey": "grassh1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassh1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 13,
        "position": {
          "x": -50,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2300,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 14,
        "position": {
          "x": 800,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 600,
          "height": 200,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 15,
        "position": {
          "x": 850,
          "y": -200
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 500,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 16,
        "position": {
          "x": 1004,
          "y": -42
        },
        "angle": 0,
        "semanticKey": "grassm1",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/grassm1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 17,
        "position": {
          "x": 1088,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "",
          "sprite": "levelhaystack2/ground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2895,
          "slicedHeight": 830
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelhome",
    "sourceId": "levelhome",
    "name": "levelhome",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 200,
    "minY": -1300,
    "width": 1800,
    "height": 1700,
    "editMinX": 200,
    "editMinY": -1300,
    "editWidth": 1800,
    "editHeight": 1700,
    "spawnX": 1192,
    "spawnY": 0,
    "finishX": 1800,
    "finishY": 0,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": null,
    "atlasAsset": null,
    "atlasImageAsset": null,
    "skySprite": "",
    "spriteAssets": {},
    "elements": [
      {
        "id": "boxcollider",
        "index": 1,
        "position": {
          "x": 100,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2300,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "levelocean",
    "sourceId": "levelocean",
    "name": "巨浪",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 450,
    "minY": -1350,
    "width": 1400,
    "height": 1800,
    "editMinX": 550,
    "editMinY": -1100,
    "editWidth": 1250,
    "editHeight": 1400,
    "spawnX": 723,
    "spawnY": 50,
    "finishX": 1003,
    "finishY": -978,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelocean.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelocean/levelocean.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelocean/levelocean.png",
    "skySprite": "levelocean/sky",
    "spriteAssets": {
      "levelocean/antenna": "/game/assets/pdzz/maps/levelocean/antenna.png",
      "levelocean/cloud": "/game/assets/pdzz/maps/levelocean/cloud.png",
      "levelocean/dock": "/game/assets/pdzz/maps/levelocean/dock.png",
      "levelocean/octopus": "/game/assets/pdzz/maps/levelocean/octopus.png",
      "levelocean/wave": "/game/assets/pdzz/maps/levelocean/wave.png",
      "levelocean/sky": "/game/assets/pdzz/maps/levelocean/frames/sky.png",
      "levelocean/cloud1": "/game/assets/pdzz/maps/levelocean/frames/cloud1.png",
      "levelocean/cloud2": "/game/assets/pdzz/maps/levelocean/frames/cloud2.png",
      "levelocean/seagull": "/game/assets/pdzz/maps/levelocean/frames/seagull.png",
      "levelocean/shark": "/game/assets/pdzz/maps/levelocean/frames/shark.png",
      "levelocean/sailboat": "/game/assets/pdzz/maps/levelocean/frames/sailboat.png",
      "levelocean/platform_rainbow": "/game/assets/pdzz/maps/levelocean/frames/platform_rainbow.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 696,
          "y": -997
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "levelocean/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 1899,
          "y": -72
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "levelocean/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1133,
          "y": 76
        },
        "angle": 0,
        "semanticKey": "wave",
        "extension": {
          "tag": "",
          "sprite": "levelocean/wave",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1573,
          "y": -821
        },
        "angle": 0,
        "semanticKey": "seagull",
        "extension": {
          "tag": "",
          "sprite": "levelocean/seagull",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "circlecollider",
        "index": 5,
        "position": {
          "x": 1551,
          "y": 508
        },
        "angle": 0,
        "semanticKey": "sharkhazard",
        "extension": {
          "tag": "sharkhazard",
          "sprite": "levelocean/shark",
          "spriteX": 79,
          "spriteY": -32,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 60,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1148,
          "y": 157
        },
        "angle": 0,
        "semanticKey": "cloud",
        "extension": {
          "tag": "",
          "sprite": "levelocean/cloud",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 400,
          "y": 550
        },
        "angle": 0,
        "semanticKey": "sailboat",
        "extension": {
          "tag": "sailboat",
          "sprite": "levelocean/dock",
          "spriteX": 175,
          "spriteY": -224,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 350,
          "height": 500,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": 850,
          "y": -550
        },
        "angle": 0,
        "semanticKey": "boat",
        "extension": {
          "tag": "boat",
          "sprite": "levelocean/sailboat",
          "spriteX": 227,
          "spriteY": -235,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 9,
        "position": {
          "x": 998,
          "y": -650
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 14,
          "height": 380,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 10,
        "position": {
          "x": 1110,
          "y": 513
        },
        "angle": 0,
        "semanticKey": "shark",
        "extension": {
          "tag": "shark",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 500,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 451,
          "y": -309
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 150,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 12,
        "position": {
          "x": 700,
          "y": -350
        },
        "angle": 0,
        "semanticKey": "limbtrigger",
        "extension": {
          "tag": "limbtrigger",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 38,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 13,
        "position": {
          "x": 600,
          "y": -400
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 89,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 14,
        "position": {
          "x": 750,
          "y": -467
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 79,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 15,
        "position": {
          "x": 856,
          "y": -503
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 47,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 16,
        "position": {
          "x": 898,
          "y": -525
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 47,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 17,
        "position": {
          "x": 450,
          "y": -550
        },
        "angle": 0,
        "semanticKey": "falldown",
        "extension": {
          "tag": "falldown",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 18,
        "position": {
          "x": 1108,
          "y": -137
        },
        "angle": 0,
        "semanticKey": "rainbow",
        "extension": {
          "tag": "rainbow",
          "sprite": "levelocean/platform_rainbow",
          "spriteX": 83,
          "spriteY": 15,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 170,
          "height": 25,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 1
        }
      }
    ]
  },
  {
    "id": "levelouterspace",
    "sourceId": "levelouterspace",
    "name": "太空",
    "available": true,
    "supportTeamBattle": true,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 600,
    "minY": -1600,
    "width": 2700,
    "height": 2000,
    "editMinX": 600,
    "editMinY": -1300,
    "editWidth": 2700,
    "editHeight": 1200,
    "spawnX": 900,
    "spawnY": -950,
    "finishX": 3000,
    "finishY": -950,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelouterspace.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelouterspace/levelouterspace.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelouterspace/levelouterspace.png",
    "skySprite": "levelouterspace/sky",
    "spriteAssets": {
      "levelouterspace/light": "/game/assets/pdzz/maps/levelouterspace/light.png",
      "levelouterspace/sky": "/game/assets/pdzz/maps/levelouterspace/sky.png",
      "levelouterspace/spaceship": "/game/assets/pdzz/maps/levelouterspace/spaceship.png",
      "levelouterspace/laser": "/game/assets/pdzz/maps/levelouterspace/frames/laser.png",
      "levelouterspace/bg1": "/game/assets/pdzz/maps/levelouterspace/frames/bg1.png",
      "levelouterspace/airjump": "/game/assets/pdzz/maps/levelouterspace/frames/airjump.png",
      "levelouterspace/bg2": "/game/assets/pdzz/maps/levelouterspace/frames/bg2.png",
      "levelouterspace/bg3": "/game/assets/pdzz/maps/levelouterspace/frames/bg3.png",
      "levelouterspace/startplatform": "/game/assets/pdzz/maps/levelouterspace/frames/startplatform.png",
      "levelouterspace/finishplatform": "/game/assets/pdzz/maps/levelouterspace/frames/finishplatform.png",
      "levelouterspace/laserbase": "/game/assets/pdzz/maps/levelouterspace/frames/laserbase.png",
      "levelouterspace/laserlight": "/game/assets/pdzz/maps/levelouterspace/frames/laserlight.png",
      "levelouterspace/laserbasehori": "/game/assets/pdzz/maps/levelouterspace/frames/laserbasehori.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1982,
          "y": -1317
        },
        "angle": 270,
        "semanticKey": "horilaser",
        "extension": {
          "tag": "horilaser",
          "sprite": "levelouterspace/laser",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 44,
          "slicedHeight": 5820
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 2,
        "position": {
          "x": 600,
          "y": -1300
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2700,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 3,
        "position": {
          "x": 1500,
          "y": -1000
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 900,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 4,
        "position": {
          "x": 1350,
          "y": -1050
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 5,
        "position": {
          "x": 1400,
          "y": -1150
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1100,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 1450,
          "y": -1200
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1000,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 2533,
          "y": -457
        },
        "angle": 0,
        "semanticKey": "bg1",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/bg1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1968,
          "y": -862
        },
        "angle": 0,
        "semanticKey": "airjump",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/airjump",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.5098039507865906,
          "isSliced": true,
          "slicedWidth": 2811,
          "slicedHeight": 2240
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 1951,
          "y": -1145
        },
        "angle": 0,
        "semanticKey": "spaceship",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/spaceship",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 1951,
          "y": -672
        },
        "angle": 0,
        "semanticKey": "light",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/light",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 600,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2700,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 12,
        "position": {
          "x": 1034,
          "y": -403
        },
        "angle": 0,
        "semanticKey": "bg2",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/bg2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 3181,
          "y": -700
        },
        "angle": 0,
        "semanticKey": "bg3",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/bg3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 14,
        "position": {
          "x": 3000,
          "y": -899
        },
        "angle": 0,
        "semanticKey": "startplatform",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/startplatform",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 15,
        "position": {
          "x": 900,
          "y": -902
        },
        "angle": 0,
        "semanticKey": "finishplatform",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/finishplatform",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 1514,
          "y": -923
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 780,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 17,
        "position": {
          "x": 1500,
          "y": -924
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 900,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "circlecollider",
        "index": 18,
        "position": {
          "x": 1550,
          "y": -977
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 48,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 19,
        "position": {
          "x": 2350,
          "y": -977
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 48,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 50,
        "position": {
          "x": 1600,
          "y": -1000
        },
        "angle": 0,
        "semanticKey": "shooter",
        "extension": {
          "tag": "shooter",
          "sprite": "levelouterspace/laserbase",
          "spriteX": -14,
          "spriteY": 61,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 50,
          "rotation": 0,
          "hazard": true,
          "colliderType": 3
        }
      },
      {
        "id": "circlecollider",
        "index": 50,
        "position": {
          "x": 2300,
          "y": -1000
        },
        "angle": 0,
        "semanticKey": "shooter",
        "extension": {
          "tag": "shooter",
          "sprite": "levelouterspace/laserbase",
          "spriteX": 14,
          "spriteY": 61,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 50,
          "rotation": 0,
          "hazard": true,
          "colliderType": 3
        }
      },
      {
        "id": "circlecollider",
        "index": 22,
        "position": {
          "x": 2500,
          "y": -1105
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 52,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 23,
        "position": {
          "x": 1400,
          "y": -1106
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 52,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 24,
        "position": {
          "x": 2400,
          "y": -1125
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 92,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 25,
        "position": {
          "x": 1500,
          "y": -1125
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 92,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 26,
        "position": {
          "x": 2100,
          "y": -1141
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 212,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 27,
        "position": {
          "x": 1750,
          "y": -1141
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 212,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 28,
        "position": {
          "x": 1650,
          "y": -1289
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 144,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 29,
        "position": {
          "x": 2250,
          "y": -1305
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 144,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 30,
        "position": {
          "x": 2412,
          "y": -1053
        },
        "angle": 50,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 260,
          "radius": null,
          "rotation": -50.20000076293945,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "boxcollider",
        "index": 31,
        "position": {
          "x": 1391,
          "y": -1159
        },
        "angle": 309,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 260,
          "radius": null,
          "rotation": -308.7699890136719,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "boxcollider",
        "index": 32,
        "position": {
          "x": 700,
          "y": -900
        },
        "angle": 0,
        "semanticKey": "start",
        "extension": {
          "tag": "start",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 33,
        "position": {
          "x": 2800,
          "y": -900
        },
        "angle": 0,
        "semanticKey": "finish",
        "extension": {
          "tag": "finish",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 34,
        "position": {
          "x": 1982,
          "y": -82
        },
        "angle": 270,
        "semanticKey": "horilaser",
        "extension": {
          "tag": "horilaser",
          "sprite": "levelouterspace/laser",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 44,
          "slicedHeight": 5820
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 35,
        "position": {
          "x": 2303,
          "y": -865
        },
        "angle": 0,
        "semanticKey": "laserlight_r",
        "extension": {
          "tag": "laserlight_r",
          "sprite": "levelouterspace/laserlight",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 36,
        "position": {
          "x": 1601,
          "y": -865
        },
        "angle": 0,
        "semanticKey": "laserlight_l",
        "extension": {
          "tag": "laserlight_l",
          "sprite": "levelouterspace/laserlight",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 37,
        "position": {
          "x": 3305,
          "y": -96
        },
        "angle": 0,
        "semanticKey": "laserbasehori",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/laserbasehori",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 38,
        "position": {
          "x": 602,
          "y": -96
        },
        "angle": 0,
        "semanticKey": "laserbasehori",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/laserbasehori",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelouterspacebattle",
    "sourceId": "levelouterspacebattle",
    "name": "太空",
    "available": true,
    "supportTeamBattle": true,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 600,
    "minY": -1600,
    "width": 2700,
    "height": 2000,
    "editMinX": 600,
    "editMinY": -1300,
    "editWidth": 2700,
    "editHeight": 1200,
    "spawnX": 900,
    "spawnY": -950,
    "finishX": 3000,
    "finishY": -950,
    "secondarySpawnPoints": [
      {
        "x": 3000,
        "y": -950
      }
    ],
    "secondaryFinishPoints": [
      {
        "x": 900,
        "y": -950
      }
    ],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelouterspacebattle.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelouterspacebattle/levelouterspacebattle.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelouterspacebattle/levelouterspacebattle.png",
    "skySprite": "levelouterspace/sky",
    "spriteAssets": {
      "levelouterspace/light": "/game/assets/pdzz/maps/levelouterspacebattle/light.png",
      "levelouterspace/sky": "/game/assets/pdzz/maps/levelouterspacebattle/sky.png",
      "levelouterspace/spaceship": "/game/assets/pdzz/maps/levelouterspacebattle/spaceship.png",
      "levelouterspace/laser": "/game/assets/pdzz/maps/levelouterspacebattle/frames/laser.png",
      "levelouterspace/bg1": "/game/assets/pdzz/maps/levelouterspacebattle/frames/bg1.png",
      "levelouterspace/airjump": "/game/assets/pdzz/maps/levelouterspacebattle/frames/airjump.png",
      "levelouterspace/bg2": "/game/assets/pdzz/maps/levelouterspacebattle/frames/bg2.png",
      "levelouterspace/bg3": "/game/assets/pdzz/maps/levelouterspacebattle/frames/bg3.png",
      "levelouterspace/startplatform": "/game/assets/pdzz/maps/levelouterspacebattle/frames/startplatform.png",
      "levelouterspace/finishplatform": "/game/assets/pdzz/maps/levelouterspacebattle/frames/finishplatform.png",
      "levelouterspace/laserbase": "/game/assets/pdzz/maps/levelouterspacebattle/frames/laserbase.png",
      "levelouterspace/laserlight": "/game/assets/pdzz/maps/levelouterspacebattle/frames/laserlight.png",
      "levelouterspace/laserbasehori": "/game/assets/pdzz/maps/levelouterspacebattle/frames/laserbasehori.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1982,
          "y": -1343
        },
        "angle": 270,
        "semanticKey": "horilaser",
        "extension": {
          "tag": "horilaser",
          "sprite": "levelouterspace/laser",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 44,
          "slicedHeight": 5820
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 2,
        "position": {
          "x": 600,
          "y": -1326
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2700,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 3,
        "position": {
          "x": 1500,
          "y": -1026
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 900,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 4,
        "position": {
          "x": 1350,
          "y": -1076
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 5,
        "position": {
          "x": 1400,
          "y": -1176
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1100,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 1450,
          "y": -1226
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1000,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 2533,
          "y": -457
        },
        "angle": 0,
        "semanticKey": "bg1",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/bg1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1968,
          "y": -862
        },
        "angle": 0,
        "semanticKey": "airjump",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/airjump",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.5098039507865906,
          "isSliced": true,
          "slicedWidth": 2811,
          "slicedHeight": 2240
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 1951,
          "y": -1171
        },
        "angle": 0,
        "semanticKey": "spaceship",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/spaceship",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 1951,
          "y": -672
        },
        "angle": 0,
        "semanticKey": "light",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/light",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 600,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2700,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 12,
        "position": {
          "x": 1034,
          "y": -403
        },
        "angle": 0,
        "semanticKey": "bg2",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/bg2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 3181,
          "y": -700
        },
        "angle": 0,
        "semanticKey": "bg3",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/bg3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 14,
        "position": {
          "x": 3000,
          "y": -899
        },
        "angle": 0,
        "semanticKey": "startplatform",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/startplatform",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 15,
        "position": {
          "x": 900,
          "y": -902
        },
        "angle": 0,
        "semanticKey": "finishplatform",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/finishplatform",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 1514,
          "y": -949
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 780,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 17,
        "position": {
          "x": 1500,
          "y": -950
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 900,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "circlecollider",
        "index": 18,
        "position": {
          "x": 1550,
          "y": -1003
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 48,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 19,
        "position": {
          "x": 2350,
          "y": -1003
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 48,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 50,
        "position": {
          "x": 1600,
          "y": -1026
        },
        "angle": 0,
        "semanticKey": "shooter",
        "extension": {
          "tag": "shooter",
          "sprite": "levelouterspace/laserbase",
          "spriteX": -14,
          "spriteY": 61,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 50,
          "rotation": 0,
          "hazard": true,
          "colliderType": 3
        }
      },
      {
        "id": "circlecollider",
        "index": 50,
        "position": {
          "x": 2300,
          "y": -1026
        },
        "angle": 0,
        "semanticKey": "shooter",
        "extension": {
          "tag": "shooter",
          "sprite": "levelouterspace/laserbase",
          "spriteX": 14,
          "spriteY": 61,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 50,
          "rotation": 0,
          "hazard": true,
          "colliderType": 3
        }
      },
      {
        "id": "circlecollider",
        "index": 22,
        "position": {
          "x": 2500,
          "y": -1131
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 52,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 23,
        "position": {
          "x": 1400,
          "y": -1132
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 52,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 24,
        "position": {
          "x": 1500,
          "y": -1151
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 92,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 25,
        "position": {
          "x": 2400,
          "y": -1151
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 92,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 26,
        "position": {
          "x": 2100,
          "y": -1167
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 212,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 27,
        "position": {
          "x": 1750,
          "y": -1167
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 212,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 28,
        "position": {
          "x": 1650,
          "y": -1315
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 144,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 29,
        "position": {
          "x": 2250,
          "y": -1331
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 144,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 30,
        "position": {
          "x": 2412,
          "y": -1079
        },
        "angle": 50,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 260,
          "radius": null,
          "rotation": -50.20000076293945,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "boxcollider",
        "index": 31,
        "position": {
          "x": 1391,
          "y": -1185
        },
        "angle": 309,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 260,
          "radius": null,
          "rotation": -308.7699890136719,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "boxcollider",
        "index": 32,
        "position": {
          "x": 700,
          "y": -900
        },
        "angle": 0,
        "semanticKey": "start",
        "extension": {
          "tag": "start",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 33,
        "position": {
          "x": 2800,
          "y": -900
        },
        "angle": 0,
        "semanticKey": "finish",
        "extension": {
          "tag": "finish",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 34,
        "position": {
          "x": 1982,
          "y": -82
        },
        "angle": 270,
        "semanticKey": "horilaser",
        "extension": {
          "tag": "horilaser",
          "sprite": "levelouterspace/laser",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 44,
          "slicedHeight": 5820
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 35,
        "position": {
          "x": 2303,
          "y": -891
        },
        "angle": 0,
        "semanticKey": "laserlight_r",
        "extension": {
          "tag": "laserlight_r",
          "sprite": "levelouterspace/laserlight",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 36,
        "position": {
          "x": 1601,
          "y": -891
        },
        "angle": 0,
        "semanticKey": "laserlight_l",
        "extension": {
          "tag": "laserlight_l",
          "sprite": "levelouterspace/laserlight",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 37,
        "position": {
          "x": 3305,
          "y": -96
        },
        "angle": 0,
        "semanticKey": "laserbasehori",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/laserbasehori",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 38,
        "position": {
          "x": 602,
          "y": -96
        },
        "angle": 0,
        "semanticKey": "laserbasehori",
        "extension": {
          "tag": "",
          "sprite": "levelouterspace/laserbasehori",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelportal",
    "sourceId": "levelportal",
    "name": "传送",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 150,
    "minY": -1950,
    "width": 1250,
    "height": 2300,
    "editMinX": 150,
    "editMinY": -1750,
    "editWidth": 1250,
    "editHeight": 1850,
    "spawnX": 400,
    "spawnY": -1450,
    "finishX": 400,
    "finishY": -500,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelportal.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelportal/levelportal.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelportal/levelportal.png",
    "skySprite": "levelportal/sky",
    "spriteAssets": {
      "levelportal/foreground": "/game/assets/pdzz/maps/levelportal/foreground.png",
      "levelportal/portal1": "/game/assets/pdzz/maps/levelportal/portal1.png",
      "levelportal/portal2": "/game/assets/pdzz/maps/levelportal/portal2.png",
      "levelportal/sky": "/game/assets/pdzz/maps/levelportal/sky.png",
      "levelportal/chain2": "/game/assets/pdzz/maps/levelportal/frames/chain2.png",
      "levelportal/chain1": "/game/assets/pdzz/maps/levelportal/frames/chain1.png",
      "levelportal/chainconnector2": "/game/assets/pdzz/maps/levelportal/frames/chainconnector2.png",
      "levelportal/chainconnector1": "/game/assets/pdzz/maps/levelportal/frames/chainconnector1.png",
      "levelportal/whitearea": "/game/assets/pdzz/maps/levelportal/frames/whitearea.png",
      "levelportal/redarea": "/game/assets/pdzz/maps/levelportal/frames/redarea.png",
      "levelportal/whiteplatform": "/game/assets/pdzz/maps/levelportal/frames/whiteplatform.png",
      "levelportal/onewayblock": "/game/assets/pdzz/maps/levelportal/frames/onewayblock.png",
      "levelportal/redplatform": "/game/assets/pdzz/maps/levelportal/frames/redplatform.png",
      "levelportal/moveplatform": "/game/assets/pdzz/maps/levelportal/frames/moveplatform.png",
      "levelportal/arrow1": "/game/assets/pdzz/maps/levelportal/frames/arrow1.png",
      "levelportal/arrow2": "/game/assets/pdzz/maps/levelportal/frames/arrow2.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 402,
          "y": 56
        },
        "angle": 0,
        "semanticKey": "chain2",
        "extension": {
          "tag": "",
          "sprite": "levelportal/chain2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 35,
          "slicedHeight": 904
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 399,
          "y": -1745
        },
        "angle": 0,
        "semanticKey": "chain1",
        "extension": {
          "tag": "",
          "sprite": "levelportal/chain1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 35,
          "slicedHeight": 603
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 402,
          "y": -138
        },
        "angle": 0,
        "semanticKey": "chainconnector2",
        "extension": {
          "tag": "",
          "sprite": "levelportal/chainconnector2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 404,
          "y": -1461
        },
        "angle": 0,
        "semanticKey": "chainconnector1",
        "extension": {
          "tag": "",
          "sprite": "levelportal/chainconnector1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 426,
          "y": -536
        },
        "angle": 0,
        "semanticKey": "whitearea",
        "extension": {
          "tag": "",
          "sprite": "levelportal/whitearea",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 418,
          "y": -1038
        },
        "angle": 0,
        "semanticKey": "redarea",
        "extension": {
          "tag": "",
          "sprite": "levelportal/redarea",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 777,
          "y": 240
        },
        "angle": 0,
        "semanticKey": "foreground",
        "extension": {
          "tag": "",
          "sprite": "levelportal/foreground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 397,
          "y": -334
        },
        "angle": 0,
        "semanticKey": "whiteplatform",
        "extension": {
          "tag": "",
          "sprite": "levelportal/whiteplatform",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 781,
          "y": -824
        },
        "angle": 0,
        "semanticKey": "onewayblock",
        "extension": {
          "tag": "",
          "sprite": "levelportal/onewayblock",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 1360,
          "slicedHeight": 54
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 400,
          "y": -1275
        },
        "angle": 0,
        "semanticKey": "redplatform",
        "extension": {
          "tag": "",
          "sprite": "levelportal/redplatform",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 783,
          "y": -1841
        },
        "angle": 0,
        "semanticKey": "foreground",
        "extension": {
          "tag": "",
          "sprite": "levelportal/foreground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": true,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": 100,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "bottomtrigger",
        "extension": {
          "tag": "bottomtrigger",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1350,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 1
        }
      },
      {
        "id": "boxcollider",
        "index": 13,
        "position": {
          "x": 200,
          "y": -150
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 14,
        "position": {
          "x": 1300,
          "y": -150
        },
        "angle": 0,
        "semanticKey": "portaldownspace",
        "extension": {
          "tag": "portaldownspace",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 600,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 15,
        "position": {
          "x": 1314,
          "y": -200
        },
        "angle": 0,
        "semanticKey": "portaldown",
        "extension": {
          "tag": "portaldown",
          "sprite": "levelportal/portal2",
          "spriteX": 38,
          "spriteY": -247,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 500,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 516,
          "y": -207
        },
        "angle": 32,
        "semanticKey": "bottomright",
        "extension": {
          "tag": "bottomright",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 282,
          "radius": null,
          "rotation": -32,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "boxcollider",
        "index": 17,
        "position": {
          "x": 350,
          "y": -250
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 250,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "boxcollider",
        "index": 18,
        "position": {
          "x": 200,
          "y": -250
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 19,
        "position": {
          "x": 202,
          "y": -287
        },
        "angle": 325,
        "semanticKey": "bottomleft",
        "extension": {
          "tag": "bottomleft",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 260,
          "radius": null,
          "rotation": -325,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "boxcollider",
        "index": 20,
        "position": {
          "x": 250,
          "y": -350
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 21,
        "position": {
          "x": 300,
          "y": -400
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 22,
        "position": {
          "x": 100,
          "y": -700
        },
        "angle": 0,
        "semanticKey": "bordertrigger",
        "extension": {
          "tag": "bordertrigger",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1350,
          "height": 145,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 2
        }
      },
      {
        "id": "boxcollider",
        "index": 23,
        "position": {
          "x": 100,
          "y": -800
        },
        "angle": 0,
        "semanticKey": "border",
        "extension": {
          "tag": "border",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1350,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 24,
        "position": {
          "x": 1300,
          "y": -900
        },
        "angle": 0,
        "semanticKey": "portalupspace",
        "extension": {
          "tag": "portalupspace",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 600,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 25,
        "position": {
          "x": 1313,
          "y": -950
        },
        "angle": 0,
        "semanticKey": "portalup",
        "extension": {
          "tag": "portalup",
          "sprite": "levelportal/portal1",
          "spriteX": 38,
          "spriteY": -259,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 500,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 26,
        "position": {
          "x": 800,
          "y": -950
        },
        "angle": 0,
        "semanticKey": "moveplatform",
        "extension": {
          "tag": "moveplatform",
          "sprite": "levelportal/moveplatform",
          "spriteX": 201,
          "spriteY": -72,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 150,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 27,
        "position": {
          "x": 353,
          "y": -1099
        },
        "angle": 35,
        "semanticKey": "topleft",
        "extension": {
          "tag": "topleft",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 270,
          "radius": null,
          "rotation": -35,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "boxcollider",
        "index": 28,
        "position": {
          "x": 350,
          "y": -1100
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 250,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 29,
        "position": {
          "x": 300,
          "y": -1100
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 30,
        "position": {
          "x": 369,
          "y": -1153
        },
        "angle": 330,
        "semanticKey": "topright",
        "extension": {
          "tag": "topright",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 285,
          "radius": null,
          "rotation": -329.8999938964844,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "boxcollider",
        "index": 31,
        "position": {
          "x": 250,
          "y": -1200
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 32,
        "position": {
          "x": 200,
          "y": -1250
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 33,
        "position": {
          "x": 200,
          "y": -1350
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 34,
        "position": {
          "x": 100,
          "y": -1900
        },
        "angle": 0,
        "semanticKey": "toptrigger",
        "extension": {
          "tag": "toptrigger",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1350,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 1
        }
      },
      {
        "id": "scene",
        "index": 35,
        "position": {
          "x": 1324,
          "y": -1031
        },
        "angle": 0,
        "semanticKey": "arrow1",
        "extension": {
          "tag": "",
          "sprite": "levelportal/arrow1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 36,
        "position": {
          "x": 1324,
          "y": -1188
        },
        "angle": 0,
        "semanticKey": "arrow1",
        "extension": {
          "tag": "",
          "sprite": "levelportal/arrow1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 37,
        "position": {
          "x": 1324,
          "y": -1347
        },
        "angle": 0,
        "semanticKey": "arrow1",
        "extension": {
          "tag": "",
          "sprite": "levelportal/arrow1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 38,
        "position": {
          "x": 1329,
          "y": -277
        },
        "angle": 0,
        "semanticKey": "arrow2",
        "extension": {
          "tag": "",
          "sprite": "levelportal/arrow2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 39,
        "position": {
          "x": 1329,
          "y": -446
        },
        "angle": 0,
        "semanticKey": "arrow2",
        "extension": {
          "tag": "",
          "sprite": "levelportal/arrow2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 40,
        "position": {
          "x": 1329,
          "y": -615
        },
        "angle": 0,
        "semanticKey": "arrow2",
        "extension": {
          "tag": "",
          "sprite": "levelportal/arrow2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelskycastle",
    "sourceId": "levelskycastle",
    "name": "天空之城",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 600,
    "minY": -2200,
    "width": 1050,
    "height": 3150,
    "editMinX": 700,
    "editMinY": -2000,
    "editWidth": 850,
    "editHeight": 2100,
    "spawnX": 1200,
    "spawnY": -300,
    "finishX": 1100,
    "finishY": -1700,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelskycastle.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelskycastle/levelskycastle.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelskycastle/levelskycastle.png",
    "skySprite": "levelskycastle/sky",
    "spriteAssets": {
      "levelskycastle/bg": "/game/assets/pdzz/maps/levelskycastle/bg.png",
      "levelskycastle/fog": "/game/assets/pdzz/maps/levelskycastle/fog.png",
      "levelskycastle/orbithinge": "/game/assets/pdzz/maps/levelskycastle/orbithinge.png",
      "levelskycastle/sky": "/game/assets/pdzz/maps/levelskycastle/sky.png",
      "levelskycastle/starthinge1": "/game/assets/pdzz/maps/levelskycastle/frames/starthinge1.png",
      "levelskycastle/starthinge2": "/game/assets/pdzz/maps/levelskycastle/frames/starthinge2.png",
      "levelskycastle/orbit2": "/game/assets/pdzz/maps/levelskycastle/frames/orbit2.png",
      "levelskycastle/orbit1": "/game/assets/pdzz/maps/levelskycastle/frames/orbit1.png",
      "levelskycastle/finishplatform": "/game/assets/pdzz/maps/levelskycastle/frames/finishplatform.png",
      "levelskycastle/startplatform": "/game/assets/pdzz/maps/levelskycastle/frames/startplatform.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1147,
          "y": -511
        },
        "angle": 0,
        "semanticKey": "bg",
        "extension": {
          "tag": "",
          "sprite": "levelskycastle/bg",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.6409800052642822,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 680,
          "y": -1126
        },
        "angle": 0,
        "semanticKey": "orbithinge",
        "extension": {
          "tag": "",
          "sprite": "levelskycastle/orbithinge",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1139,
          "y": 504
        },
        "angle": 0,
        "semanticKey": "fog",
        "extension": {
          "tag": "",
          "sprite": "levelskycastle/fog",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1323,
          "y": 2
        },
        "angle": 0,
        "semanticKey": "starthinge1",
        "extension": {
          "tag": "",
          "sprite": "levelskycastle/starthinge1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1504,
          "y": -173
        },
        "angle": 0,
        "semanticKey": "starthinge2",
        "extension": {
          "tag": "",
          "sprite": "levelskycastle/starthinge2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 850,
          "y": -600
        },
        "angle": 0,
        "semanticKey": "asteroidsmall",
        "extension": {
          "tag": "asteroidsmall",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 875,
          "y": -623
        },
        "angle": 0,
        "semanticKey": "asteroidsmall",
        "extension": {
          "tag": "asteroidsmall",
          "sprite": "levelskycastle/orbit2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 875,
          "y": -925
        },
        "angle": 0,
        "semanticKey": "asteroidbig",
        "extension": {
          "tag": "asteroidbig",
          "sprite": "levelskycastle/orbit1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 1148,
          "y": -1663
        },
        "angle": 0,
        "semanticKey": "finishplatform",
        "extension": {
          "tag": "",
          "sprite": "levelskycastle/finishplatform",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.5860928297042847,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "circlecollider",
        "index": 10,
        "position": {
          "x": 1123,
          "y": 957
        },
        "angle": 0,
        "semanticKey": "bosspivot",
        "extension": {
          "tag": "bosspivot",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 5,
          "rotation": 0,
          "hazard": true,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 827,
          "y": 799
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 560,
          "height": 375,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 12,
        "position": {
          "x": 910,
          "y": 313
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 207,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 13,
        "position": {
          "x": 1348,
          "y": 300
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 207,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 14,
        "position": {
          "x": 1000,
          "y": -250
        },
        "angle": 0,
        "semanticKey": "start",
        "extension": {
          "tag": "start",
          "sprite": "levelskycastle/startplatform",
          "spriteX": 200,
          "spriteY": -1,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 15,
        "position": {
          "x": 875,
          "y": -925
        },
        "angle": 0,
        "semanticKey": "asteroidbig",
        "extension": {
          "tag": "asteroidbig",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 125,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 1048,
          "y": -1618
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 2
        }
      },
      {
        "id": "boxcollider",
        "index": 17,
        "position": {
          "x": 950,
          "y": -1650
        },
        "angle": 0,
        "semanticKey": "finish",
        "extension": {
          "tag": "finish",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "levelslime",
    "sourceId": "levelclassic",
    "name": "经典",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 350,
    "minY": -1400,
    "width": 1500,
    "height": 1800,
    "editMinX": 450,
    "editMinY": -1300,
    "editWidth": 1300,
    "editHeight": 1500,
    "spawnX": 1255,
    "spawnY": 0,
    "finishX": 1255,
    "finishY": -1092,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelslime.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelslime/levelslime.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelslime/levelslime.png",
    "skySprite": "",
    "spriteAssets": {
      "levelslime/groundright": "/game/assets/pdzz/maps/levelslime/groundright.png",
      "levelslime/spotlight": "/game/assets/pdzz/maps/levelslime/spotlight.png",
      "levelslime/stairback": "/game/assets/pdzz/maps/levelslime/stairback.png",
      "levelslime/stairbefore": "/game/assets/pdzz/maps/levelslime/stairbefore.png",
      "levelslime/background": "/game/assets/pdzz/maps/levelslime/frames/background.png",
      "levelslime/pillarbefore": "/game/assets/pdzz/maps/levelslime/frames/pillarbefore.png",
      "levelslime/windowslime1": "/game/assets/pdzz/maps/levelslime/frames/windowslime1.png",
      "levelslime/pillarback": "/game/assets/pdzz/maps/levelslime/frames/pillarback.png",
      "levelslime/window": "/game/assets/pdzz/maps/levelslime/frames/window.png",
      "levelslime/spiderweb": "/game/assets/pdzz/maps/levelslime/frames/spiderweb.png",
      "levelslime/windowlight": "/game/assets/pdzz/maps/levelslime/frames/windowlight.png",
      "levelslime/wallcandle1": "/game/assets/pdzz/maps/levelslime/frames/wallcandle1.png",
      "levelslime/fog": "/game/assets/pdzz/maps/levelslime/frames/fog.png",
      "levelslime/belt": "/game/assets/pdzz/maps/levelslime/frames/belt.png",
      "levelslime/rope": "/game/assets/pdzz/maps/levelslime/frames/rope.png",
      "levelslime/rings": "/game/assets/pdzz/maps/levelslime/frames/rings.png",
      "levelslime/gear2": "/game/assets/pdzz/maps/levelslime/frames/gear2.png",
      "levelslime/gear3": "/game/assets/pdzz/maps/levelslime/frames/gear3.png",
      "levelslime/gear1": "/game/assets/pdzz/maps/levelslime/frames/gear1.png",
      "levelslime/door": "/game/assets/pdzz/maps/levelslime/frames/door.png",
      "levelslime/switch": "/game/assets/pdzz/maps/levelslime/frames/switch.png",
      "levelslime/platform1x1": "/game/assets/pdzz/maps/levelslime/frames/platform1x1.png",
      "levelslime/lift": "/game/assets/pdzz/maps/levelslime/frames/lift.png",
      "levelslime/platform2x2": "/game/assets/pdzz/maps/levelslime/frames/platform2x2.png",
      "levelslime/platform2x7": "/game/assets/pdzz/maps/levelslime/frames/platform2x7.png",
      "levelslime/platformslime": "/game/assets/pdzz/maps/levelslime/frames/platformslime.png",
      "levelslime/chain": "/game/assets/pdzz/maps/levelslime/frames/chain.png",
      "levelslime/cage1": "/game/assets/pdzz/maps/levelslime/frames/cage1.png",
      "levelslime/wall": "/game/assets/pdzz/maps/levelslime/frames/wall.png",
      "levelslime/slime1": "/game/assets/pdzz/maps/levelslime/frames/slime1.png",
      "levelslime/groundleft": "/game/assets/pdzz/maps/levelslime/frames/groundleft.png",
      "levelslime/candle1": "/game/assets/pdzz/maps/levelslime/frames/candle1.png",
      "levelslime/cloud1left": "/game/assets/pdzz/maps/levelslime/frames/cloud1left.png",
      "levelslime/cloud1right": "/game/assets/pdzz/maps/levelslime/frames/cloud1right.png",
      "levelslime/cloud2right": "/game/assets/pdzz/maps/levelslime/frames/cloud2right.png",
      "levelslime/cloud2left": "/game/assets/pdzz/maps/levelslime/frames/cloud2left.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1188,
          "y": -522
        },
        "angle": 0,
        "semanticKey": "background",
        "extension": {
          "tag": "",
          "sprite": "levelslime/background",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2408,
          "slicedHeight": 1843
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 1095,
          "y": -162
        },
        "angle": 0,
        "semanticKey": "stairback",
        "extension": {
          "tag": "",
          "sprite": "levelslime/stairback",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 596,
          "y": -476
        },
        "angle": 0,
        "semanticKey": "pillarbefore",
        "extension": {
          "tag": "",
          "sprite": "levelslime/pillarbefore",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1498,
          "y": -736
        },
        "angle": 0,
        "semanticKey": "windowslime1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/windowslime1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1508,
          "y": -812
        },
        "angle": 0,
        "semanticKey": "pillarback",
        "extension": {
          "tag": "",
          "sprite": "levelslime/pillarback",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 596,
          "y": -910
        },
        "angle": 0,
        "semanticKey": "window",
        "extension": {
          "tag": "",
          "sprite": "levelslime/window",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 17,
        "position": {
          "x": 456,
          "y": -1339
        },
        "angle": 0,
        "semanticKey": "spiderweb",
        "extension": {
          "tag": "",
          "sprite": "levelslime/spiderweb",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 18,
        "position": {
          "x": 845,
          "y": 103
        },
        "angle": 0,
        "semanticKey": "stairbefore",
        "extension": {
          "tag": "",
          "sprite": "levelslime/stairbefore",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 19,
        "position": {
          "x": 719,
          "y": -261
        },
        "angle": 0,
        "semanticKey": "windowlight",
        "extension": {
          "tag": "",
          "sprite": "levelslime/windowlight",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 20,
        "position": {
          "x": 1198,
          "y": -226
        },
        "angle": 0,
        "semanticKey": "wallcandle1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/wallcandle1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 21,
        "position": {
          "x": 1691,
          "y": -226
        },
        "angle": 0,
        "semanticKey": "wallcandle1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/wallcandle1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 22,
        "position": {
          "x": 825,
          "y": -424
        },
        "angle": 0,
        "semanticKey": "wallcandle1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/wallcandle1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 23,
        "position": {
          "x": 1345,
          "y": -593
        },
        "angle": 0,
        "semanticKey": "spotlight",
        "extension": {
          "tag": "",
          "sprite": "levelslime/spotlight",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 24,
        "position": {
          "x": 1247,
          "y": -755
        },
        "angle": 0,
        "semanticKey": "wallcandle1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/wallcandle1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 25,
        "position": {
          "x": 1735,
          "y": -758
        },
        "angle": 0,
        "semanticKey": "wallcandle1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/wallcandle1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 26,
        "position": {
          "x": 1388,
          "y": -134
        },
        "angle": 0,
        "semanticKey": "fog",
        "extension": {
          "tag": "",
          "sprite": "levelslime/fog",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 4,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 27,
        "position": {
          "x": 845,
          "y": -1126
        },
        "angle": 0,
        "semanticKey": "belt",
        "extension": {
          "tag": "",
          "sprite": "levelslime/belt",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 28,
        "position": {
          "x": 750,
          "y": -1150
        },
        "angle": 0,
        "semanticKey": "rope",
        "extension": {
          "tag": "rope",
          "sprite": "levelslime/rope",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 6,
          "slicedHeight": 1100
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 29,
        "position": {
          "x": 1333,
          "y": -1349
        },
        "angle": 0,
        "semanticKey": "belt",
        "extension": {
          "tag": "",
          "sprite": "levelslime/belt",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 30,
        "position": {
          "x": 1256,
          "y": -1395
        },
        "angle": 0,
        "semanticKey": "rope",
        "extension": {
          "tag": "",
          "sprite": "levelslime/rope",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 6,
          "slicedHeight": 150
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 31,
        "position": {
          "x": 750,
          "y": -20
        },
        "angle": 0,
        "semanticKey": "rings",
        "extension": {
          "tag": "rings",
          "sprite": "levelslime/rings",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 32,
        "position": {
          "x": 980,
          "y": -1088
        },
        "angle": 2,
        "semanticKey": "gear2",
        "extension": {
          "tag": "",
          "sprite": "levelslime/gear2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 33,
        "position": {
          "x": 784,
          "y": -1122
        },
        "angle": 0,
        "semanticKey": "gear3",
        "extension": {
          "tag": "",
          "sprite": "levelslime/gear3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 34,
        "position": {
          "x": 923,
          "y": -1123
        },
        "angle": 0,
        "semanticKey": "gear1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/gear1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 35,
        "position": {
          "x": 1256,
          "y": -1212
        },
        "angle": 0,
        "semanticKey": "rings",
        "extension": {
          "tag": "",
          "sprite": "levelslime/rings",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 36,
        "position": {
          "x": 1419,
          "y": -1345
        },
        "angle": 2,
        "semanticKey": "gear2",
        "extension": {
          "tag": "",
          "sprite": "levelslime/gear2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 37,
        "position": {
          "x": 1265,
          "y": -1345
        },
        "angle": 0,
        "semanticKey": "gear3",
        "extension": {
          "tag": "",
          "sprite": "levelslime/gear3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": -50,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "groundleft",
        "extension": {
          "tag": "groundleft",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 750,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 900,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "groundright",
        "extension": {
          "tag": "groundright",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1350,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 9,
        "position": {
          "x": 650,
          "y": 35
        },
        "angle": 0,
        "semanticKey": "switchbottom",
        "extension": {
          "tag": "switchbottom",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 41,
        "position": {
          "x": 350,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "wallleft",
        "extension": {
          "tag": "wallleft",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 1450,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 42,
        "position": {
          "x": 1800,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "wallright",
        "extension": {
          "tag": "wallright",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 1450,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 43,
        "position": {
          "x": 1445,
          "y": -199
        },
        "angle": 0,
        "semanticKey": "door",
        "extension": {
          "tag": "",
          "sprite": "levelslime/door",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 10,
        "position": {
          "x": 650,
          "y": -714
        },
        "angle": 0,
        "semanticKey": "switchtop",
        "extension": {
          "tag": "switchtop",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 45,
        "position": {
          "x": 668,
          "y": -744
        },
        "angle": 0,
        "semanticKey": "switchtop",
        "extension": {
          "tag": "switchtop",
          "sprite": "levelslime/switch",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 46,
        "position": {
          "x": 1276,
          "y": -875
        },
        "angle": 0,
        "semanticKey": "platform1x1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/platform1x1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": 700,
          "y": 100
        },
        "angle": 0,
        "semanticKey": "lift",
        "extension": {
          "tag": "lift",
          "sprite": "levelslime/lift",
          "spriteX": 50,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 13,
        "position": {
          "x": 600,
          "y": -650
        },
        "angle": 0,
        "semanticKey": "platform2x2",
        "extension": {
          "tag": "",
          "sprite": "levelslime/platform2x2",
          "spriteX": 50,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 14,
        "position": {
          "x": 1100,
          "y": -750
        },
        "angle": 0,
        "semanticKey": "platform2x7",
        "extension": {
          "tag": "",
          "sprite": "levelslime/platform2x7",
          "spriteX": 176,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 350,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 15,
        "position": {
          "x": 900,
          "y": -750
        },
        "angle": 0,
        "semanticKey": "platformslime",
        "extension": {
          "tag": "",
          "sprite": "levelslime/platformslime",
          "spriteX": 50,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 1250,
          "y": -850
        },
        "angle": 0,
        "semanticKey": "platform1x1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/platform1x1",
          "spriteX": 26,
          "spriteY": -25,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 52,
        "position": {
          "x": 460,
          "y": -48
        },
        "angle": 0,
        "semanticKey": "chain",
        "extension": {
          "tag": "",
          "sprite": "levelslime/chain",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 500,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 150,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 54,
        "position": {
          "x": 575,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "cage1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/cage1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 55,
        "position": {
          "x": 670,
          "y": 3
        },
        "angle": 0,
        "semanticKey": "switchbottom",
        "extension": {
          "tag": "switchbottom",
          "sprite": "levelslime/switch",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 56,
        "position": {
          "x": 1850,
          "y": -725
        },
        "angle": 0,
        "semanticKey": "wall",
        "extension": {
          "tag": "wall",
          "sprite": "levelslime/wall",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 100,
          "slicedHeight": 1450
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 57,
        "position": {
          "x": 350,
          "y": -725
        },
        "angle": 0,
        "semanticKey": "wall",
        "extension": {
          "tag": "wall",
          "sprite": "levelslime/wall",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 100,
          "slicedHeight": 1450
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 58,
        "position": {
          "x": 400,
          "y": -700
        },
        "angle": 0,
        "semanticKey": "slime",
        "extension": {
          "tag": "slime",
          "sprite": "levelslime/slime1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 12,
          "slicedHeight": 1450
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 59,
        "position": {
          "x": 1800,
          "y": -725
        },
        "angle": 0,
        "semanticKey": "slime",
        "extension": {
          "tag": "slime",
          "sprite": "levelslime/slime1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 12,
          "slicedHeight": 1450
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 60,
        "position": {
          "x": 513,
          "y": 220
        },
        "angle": 0,
        "semanticKey": "groundleft",
        "extension": {
          "tag": "",
          "sprite": "levelslime/groundleft",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 61,
        "position": {
          "x": 1390,
          "y": 220
        },
        "angle": 0,
        "semanticKey": "groundright",
        "extension": {
          "tag": "",
          "sprite": "levelslime/groundright",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 62,
        "position": {
          "x": 1040,
          "y": 33
        },
        "angle": 0,
        "semanticKey": "candle1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/candle1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 63,
        "position": {
          "x": 461,
          "y": 33
        },
        "angle": 0,
        "semanticKey": "candle1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/candle1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 64,
        "position": {
          "x": 1614,
          "y": 33
        },
        "angle": 0,
        "semanticKey": "candle1",
        "extension": {
          "tag": "",
          "sprite": "levelslime/candle1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 65,
        "position": {
          "x": 705,
          "y": 315
        },
        "angle": 0,
        "semanticKey": "cloud1left",
        "extension": {
          "tag": "",
          "sprite": "levelslime/cloud1left",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 4,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 66,
        "position": {
          "x": 1408,
          "y": 235
        },
        "angle": 0,
        "semanticKey": "cloud1right",
        "extension": {
          "tag": "",
          "sprite": "levelslime/cloud1right",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 4,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 67,
        "position": {
          "x": 1540,
          "y": 187
        },
        "angle": 0,
        "semanticKey": "cloud2right",
        "extension": {
          "tag": "",
          "sprite": "levelslime/cloud2right",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 4,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 68,
        "position": {
          "x": 542,
          "y": 181
        },
        "angle": 0,
        "semanticKey": "cloud2left",
        "extension": {
          "tag": "",
          "sprite": "levelslime/cloud2left",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 4,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelspin",
    "sourceId": "levelspin",
    "name": "旋转谜窟",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 100,
    "minY": -1450,
    "width": 2000,
    "height": 1850,
    "editMinX": 200,
    "editMinY": -1350,
    "editWidth": 1800,
    "editHeight": 1350,
    "spawnX": 400,
    "spawnY": 0,
    "finishX": 1450,
    "finishY": -900,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelspin.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelspin/levelspin.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelspin/levelspin.png",
    "skySprite": "levelspin/sky",
    "spriteAssets": {
      "levelspin/bg_statue": "/game/assets/pdzz/maps/levelspin/bg_statue.png",
      "levelspin/bg_tree1": "/game/assets/pdzz/maps/levelspin/bg_tree1.png",
      "levelspin/bg_tree2": "/game/assets/pdzz/maps/levelspin/bg_tree2.png",
      "levelspin/sky": "/game/assets/pdzz/maps/levelspin/sky.png",
      "levelspin/spinstatue": "/game/assets/pdzz/maps/levelspin/spinstatue.png",
      "levelspin/ground": "/game/assets/pdzz/maps/levelspin/frames/ground.png",
      "levelspin/spinbg": "/game/assets/pdzz/maps/levelspin/frames/spinbg.png",
      "levelspin/torch": "/game/assets/pdzz/maps/levelspin/frames/torch.png",
      "levelspin/ground_deco3": "/game/assets/pdzz/maps/levelspin/frames/ground_deco3.png",
      "levelspin/ground_deco1": "/game/assets/pdzz/maps/levelspin/frames/ground_deco1.png",
      "levelspin/ground_deco2": "/game/assets/pdzz/maps/levelspin/frames/ground_deco2.png",
      "levelspin/spinwall": "/game/assets/pdzz/maps/levelspin/frames/spinwall.png",
      "levelspin/spinsquare": "/game/assets/pdzz/maps/levelspin/frames/spinsquare.png",
      "levelspin/spincenter": "/game/assets/pdzz/maps/levelspin/frames/spincenter.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 530,
          "y": -470
        },
        "angle": 0,
        "semanticKey": "bg_tree1",
        "extension": {
          "tag": "",
          "sprite": "levelspin/bg_tree1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 992,
          "y": -81
        },
        "angle": 0,
        "semanticKey": "bg_statue",
        "extension": {
          "tag": "",
          "sprite": "levelspin/bg_statue",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1073,
          "y": 211
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "",
          "sprite": "levelspin/ground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2211,
          "slicedHeight": 420
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1669,
          "y": -544
        },
        "angle": 0,
        "semanticKey": "bg_tree2",
        "extension": {
          "tag": "",
          "sprite": "levelspin/bg_tree2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1094,
          "y": -591
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/spinbg",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 1086,
          "slicedHeight": 971
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1498,
          "y": -644
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/torch",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 660,
          "y": -644
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/torch",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1099,
          "y": -598
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/spinstatue",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 0.9599999785423279,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 2118,
          "y": 155
        },
        "angle": 0,
        "semanticKey": "ground_deco3",
        "extension": {
          "tag": "",
          "sprite": "levelspin/ground_deco3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 590,
          "y": 155
        },
        "angle": 0,
        "semanticKey": "ground_deco3",
        "extension": {
          "tag": "",
          "sprite": "levelspin/ground_deco3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 229,
          "y": 126
        },
        "angle": 0,
        "semanticKey": "ground_deco1",
        "extension": {
          "tag": "",
          "sprite": "levelspin/ground_deco1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 12,
        "position": {
          "x": 1526,
          "y": 126
        },
        "angle": 0,
        "semanticKey": "ground_deco1",
        "extension": {
          "tag": "",
          "sprite": "levelspin/ground_deco1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 979,
          "y": 126
        },
        "angle": 0,
        "semanticKey": "ground_deco2",
        "extension": {
          "tag": "",
          "sprite": "levelspin/ground_deco2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 14,
        "position": {
          "x": 1217,
          "y": -126
        },
        "angle": 0,
        "semanticKey": "spin_flag",
        "extension": {
          "tag": "spin_flag",
          "sprite": "levelspin/spinwall",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 736,
          "slicedHeight": 51
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 15,
        "position": {
          "x": 874,
          "y": -494
        },
        "angle": 90,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/spinwall",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 711,
          "slicedHeight": 51
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 16,
        "position": {
          "x": 1624,
          "y": -590
        },
        "angle": 90,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/spinwall",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 910,
          "slicedHeight": 51
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 17,
        "position": {
          "x": 574,
          "y": -708
        },
        "angle": 90,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/spinwall",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 616,
          "slicedHeight": 51
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 18,
        "position": {
          "x": 1324,
          "y": -722
        },
        "angle": 90,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/spinwall",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 739,
          "slicedHeight": 51
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 19,
        "position": {
          "x": 1089,
          "y": -1075
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/spinwall",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 927,
          "slicedHeight": 51
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 20,
        "position": {
          "x": 599,
          "y": -150
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/spinsquare",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 21,
        "position": {
          "x": 1599,
          "y": -150
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/spinsquare",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 22,
        "position": {
          "x": 1599,
          "y": -1050
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/spinsquare",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 23,
        "position": {
          "x": 599,
          "y": -1050
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "levelspin/spinsquare",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 24,
        "position": {
          "x": -100,
          "y": 500
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 2400,
          "height": 500,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 25,
        "position": {
          "x": 850,
          "y": -100
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 700,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 26,
        "position": {
          "x": 850,
          "y": -150
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 700,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 27,
        "position": {
          "x": 1600,
          "y": -200
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 800,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 28,
        "position": {
          "x": 1300,
          "y": -350
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 700,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 29,
        "position": {
          "x": 550,
          "y": -400
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 600,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 30,
        "position": {
          "x": 1050,
          "y": -550
        },
        "angle": 0,
        "semanticKey": "centerSquare",
        "extension": {
          "tag": "centerSquare",
          "sprite": "levelspin/spincenter",
          "spriteX": 49,
          "spriteY": -51,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 31,
        "position": {
          "x": 1100,
          "y": -600
        },
        "angle": 0,
        "semanticKey": "pivot",
        "extension": {
          "tag": "pivot",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 20,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 32,
        "position": {
          "x": 550,
          "y": -1000
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 33,
        "position": {
          "x": 650,
          "y": -1050
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 900,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 34,
        "position": {
          "x": 1550,
          "y": -100
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 35,
        "position": {
          "x": 550,
          "y": -100
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 36,
        "position": {
          "x": 1550,
          "y": -1000
        },
        "angle": 0,
        "semanticKey": "spin",
        "extension": {
          "tag": "spin",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "levelsteampunk",
    "sourceId": "levelsteampunk",
    "name": "蒸汽朋克",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 200,
    "minY": -1150,
    "width": 3000,
    "height": 1700,
    "editMinX": 700,
    "editMinY": -800,
    "editWidth": 2400,
    "editHeight": 950,
    "spawnX": 950,
    "spawnY": 150,
    "finishX": 2900,
    "finishY": -150,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelsteampunk.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelsteampunk/levelsteampunk.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelsteampunk/levelsteampunk.png",
    "skySprite": "levelsteampunk/sky",
    "spriteAssets": {
      "levelsteampunk/bg_gears2": "/game/assets/pdzz/maps/levelsteampunk/bg_gears2.png",
      "levelsteampunk/bg_steam3": "/game/assets/pdzz/maps/levelsteampunk/bg_steam3.png",
      "levelsteampunk/farbg": "/game/assets/pdzz/maps/levelsteampunk/farbg.png",
      "levelsteampunk/finish_bg": "/game/assets/pdzz/maps/levelsteampunk/finish_bg.png",
      "levelsteampunk/finish_tower": "/game/assets/pdzz/maps/levelsteampunk/finish_tower.png",
      "levelsteampunk/sky": "/game/assets/pdzz/maps/levelsteampunk/frames/sky.png",
      "levelsteampunk/steam": "/game/assets/pdzz/maps/levelsteampunk/steam.png",
      "levelsteampunk/start_fence1": "/game/assets/pdzz/maps/levelsteampunk/frames/start_fence1.png",
      "levelsteampunk/finish_pipe": "/game/assets/pdzz/maps/levelsteampunk/frames/finish_pipe.png",
      "levelsteampunk/rope": "/game/assets/pdzz/maps/levelsteampunk/frames/rope.png",
      "levelsteampunk/start_pole": "/game/assets/pdzz/maps/levelsteampunk/frames/start_pole.png",
      "levelsteampunk/start_platform2": "/game/assets/pdzz/maps/levelsteampunk/frames/start_platform2.png",
      "levelsteampunk/start_platform1": "/game/assets/pdzz/maps/levelsteampunk/frames/start_platform1.png",
      "levelsteampunk/start_fence3": "/game/assets/pdzz/maps/levelsteampunk/frames/start_fence3.png",
      "levelsteampunk/start_fence2": "/game/assets/pdzz/maps/levelsteampunk/frames/start_fence2.png",
      "levelsteampunk/platform": "/game/assets/pdzz/maps/levelsteampunk/frames/platform.png",
      "levelsteampunk/hoist": "/game/assets/pdzz/maps/levelsteampunk/frames/hoist.png",
      "levelsteampunk/start_sign": "/game/assets/pdzz/maps/levelsteampunk/frames/start_sign.png",
      "levelsteampunk/finish_glasses": "/game/assets/pdzz/maps/levelsteampunk/frames/finish_glasses.png",
      "levelsteampunk/bg_gears3": "/game/assets/pdzz/maps/levelsteampunk/frames/bg_gears3.png",
      "levelsteampunk/bg_gears1": "/game/assets/pdzz/maps/levelsteampunk/frames/bg_gears1.png",
      "levelsteampunk/bg_steam1": "/game/assets/pdzz/maps/levelsteampunk/frames/bg_steam1.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 917,
          "y": 60
        },
        "angle": 0,
        "semanticKey": "start_fence1",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/start_fence1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 2448,
          "y": 340
        },
        "angle": 0,
        "semanticKey": "finish_pipe",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/finish_pipe",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1280,
          "y": -239
        },
        "angle": 0,
        "semanticKey": "rope",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/rope",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 2881,
          "y": -326
        },
        "angle": 0,
        "semanticKey": "finish_bg",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/finish_bg",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 5,
        "position": {
          "x": 881,
          "y": 550
        },
        "angle": 0,
        "semanticKey": "boxcollider",
        "extension": {
          "tag": "boxcollider",
          "sprite": "levelsteampunk/start_pole",
          "spriteX": 42,
          "spriteY": -176,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 85,
          "height": 350,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 1050,
          "y": 300
        },
        "angle": 0,
        "semanticKey": "boxcollider",
        "extension": {
          "tag": "boxcollider",
          "sprite": "levelsteampunk/start_platform2",
          "spriteX": 75,
          "spriteY": -23,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 150,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 700,
          "y": 200
        },
        "angle": 0,
        "semanticKey": "boxcollider",
        "extension": {
          "tag": "boxcollider",
          "sprite": "levelsteampunk/start_platform1",
          "spriteX": 225,
          "spriteY": -25,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 2847,
          "y": 189
        },
        "angle": 0,
        "semanticKey": "finish_tower",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/finish_tower",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 9,
        "position": {
          "x": 2226,
          "y": 650
        },
        "angle": 0,
        "semanticKey": "boxcollider",
        "extension": {
          "tag": "boxcollider",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 910,
          "height": 500,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 972,
          "y": 408
        },
        "angle": 0,
        "semanticKey": "start_fence3",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/start_fence3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 926,
          "y": 241
        },
        "angle": 0,
        "semanticKey": "start_fence2",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/start_fence2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": 3099,
          "y": 150
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 35,
          "height": 150,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 13,
        "position": {
          "x": 2659,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 14,
        "position": {
          "x": 3109,
          "y": -7
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 26,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 15,
        "position": {
          "x": 2646,
          "y": -8
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 10,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 16,
        "position": {
          "x": 3099,
          "y": -25
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 26,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 17,
        "position": {
          "x": 2672,
          "y": -26
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 26,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 18,
        "position": {
          "x": 2694,
          "y": -43
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 36,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 19,
        "position": {
          "x": 3077,
          "y": -43
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 36,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 20,
        "position": {
          "x": 2796,
          "y": -46
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 180,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 21,
        "position": {
          "x": 2728,
          "y": -56
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 56,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 22,
        "position": {
          "x": 3041,
          "y": -56
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 56,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 23,
        "position": {
          "x": 2763,
          "y": -68
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 67,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 24,
        "position": {
          "x": 3009,
          "y": -68
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 67,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 25,
        "position": {
          "x": 2789,
          "y": -75
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 71,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 26,
        "position": {
          "x": 2975,
          "y": -76
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 71,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 27,
        "position": {
          "x": 1150,
          "y": -150
        },
        "angle": 0,
        "semanticKey": "hoistplatform",
        "extension": {
          "tag": "hoistplatform",
          "sprite": "levelsteampunk/platform",
          "spriteX": 126,
          "spriteY": -25,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 250,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 28,
        "position": {
          "x": 1748,
          "y": -364
        },
        "angle": 0,
        "semanticKey": "farbg",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/farbg",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.4711443185806274,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 29,
        "position": {
          "x": 1281,
          "y": -1099
        },
        "angle": 0,
        "semanticKey": "hoist",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/hoist",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 56,
          "slicedHeight": 1667
        },
        "collider": null
      },
      {
        "id": "circlecollider",
        "index": 30,
        "position": {
          "x": 357,
          "y": 438
        },
        "angle": 0,
        "semanticKey": "bosspivot",
        "extension": {
          "tag": "bosspivot",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 5,
          "rotation": 0,
          "hazard": true,
          "colliderType": 3
        }
      },
      {
        "id": "boxcollider",
        "index": 31,
        "position": {
          "x": 288,
          "y": 367
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 145,
          "height": 220,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 32,
        "position": {
          "x": 65,
          "y": 150
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 575,
          "height": 215,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 33,
        "position": {
          "x": 67,
          "y": -79
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 515,
          "height": 130,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 34,
        "position": {
          "x": 65,
          "y": -200
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 575,
          "height": 140,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 35,
        "position": {
          "x": 181,
          "y": -350
        },
        "angle": 0,
        "semanticKey": "boss",
        "extension": {
          "tag": "boss",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 360,
          "height": 115,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 36,
        "position": {
          "x": 914,
          "y": 219
        },
        "angle": 0,
        "semanticKey": "start_sign",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/start_sign",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 37,
        "position": {
          "x": 2884,
          "y": 4
        },
        "angle": 0,
        "semanticKey": "finish_glasses",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/finish_glasses",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 38,
        "position": {
          "x": 1442,
          "y": 481
        },
        "angle": 0,
        "semanticKey": "bg_gears3",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/bg_gears3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.3061000108718872,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 39,
        "position": {
          "x": 1023,
          "y": 449
        },
        "angle": 0,
        "semanticKey": "bg_gears1",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/bg_gears1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.7388999462127686,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 40,
        "position": {
          "x": 2286,
          "y": 449
        },
        "angle": 0,
        "semanticKey": "bg_steam3",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/bg_steam3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.4490000009536743,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 41,
        "position": {
          "x": 413,
          "y": 353
        },
        "angle": 0,
        "semanticKey": "bg_steam1",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/bg_steam1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2.1547999382019043,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 42,
        "position": {
          "x": 2803,
          "y": 299
        },
        "angle": 0,
        "semanticKey": "bg_gears2",
        "extension": {
          "tag": "",
          "sprite": "levelsteampunk/bg_gears2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2.284695863723755,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelstoneface",
    "sourceId": "levelstoneface",
    "name": "石像",
    "available": true,
    "supportTeamBattle": true,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 150,
    "minY": -1650,
    "width": 1950,
    "height": 2000,
    "editMinX": 250,
    "editMinY": -1250,
    "editWidth": 1750,
    "editHeight": 1350,
    "spawnX": 550,
    "spawnY": -650,
    "finishX": 1700,
    "finishY": -650,
    "secondarySpawnPoints": [
      {
        "x": 1700,
        "y": -650
      }
    ],
    "secondaryFinishPoints": [
      {
        "x": 550,
        "y": -650
      }
    ],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelstoneface.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelstoneface/levelstoneface.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelstoneface/levelstoneface.png",
    "skySprite": "levelstoneface/sky",
    "spriteAssets": {
      "levelstoneface/bg1": "/game/assets/pdzz/maps/levelstoneface/bg1.png",
      "levelstoneface/bg2": "/game/assets/pdzz/maps/levelstoneface/frames/bg2.png",
      "levelstoneface/bg3": "/game/assets/pdzz/maps/levelstoneface/frames/bg3.png",
      "levelstoneface/bg4": "/game/assets/pdzz/maps/levelstoneface/frames/bg4.png",
      "levelstoneface/left": "/game/assets/pdzz/maps/levelstoneface/left.png",
      "levelstoneface/leftbuilding": "/game/assets/pdzz/maps/levelstoneface/leftbuilding.png",
      "levelstoneface/right": "/game/assets/pdzz/maps/levelstoneface/right.png",
      "levelstoneface/sky": "/game/assets/pdzz/maps/levelstoneface/frames/sky.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 908,
          "y": 123
        },
        "angle": 0,
        "semanticKey": "bg1",
        "extension": {
          "tag": "",
          "sprite": "levelstoneface/bg1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 1418,
          "y": 331
        },
        "angle": 0,
        "semanticKey": "bg4",
        "extension": {
          "tag": "",
          "sprite": "levelstoneface/bg4",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 190,
          "y": 312
        },
        "angle": 0,
        "semanticKey": "bg3",
        "extension": {
          "tag": "",
          "sprite": "levelstoneface/bg3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 2130,
          "y": 235
        },
        "angle": 0,
        "semanticKey": "bg2",
        "extension": {
          "tag": "",
          "sprite": "levelstoneface/bg2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 5,
        "position": {
          "x": 1500,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "right",
        "extension": {
          "tag": "",
          "sprite": "levelstoneface/right",
          "spriteX": 225,
          "spriteY": -468,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 1000,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 300,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "left",
        "extension": {
          "tag": "",
          "sprite": "levelstoneface/left",
          "spriteX": 229,
          "spriteY": -471,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 1000,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "leveltemple",
    "sourceId": "leveltemple",
    "name": "神殿",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 300,
    "minY": -1250,
    "width": 1900,
    "height": 1700,
    "editMinX": 300,
    "editMinY": -1250,
    "editWidth": 1900,
    "editHeight": 1450,
    "spawnX": 555,
    "spawnY": 0,
    "finishX": 2025,
    "finishY": -749,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/leveltemple.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/leveltemple/leveltemple.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/leveltemple/leveltemple.png",
    "skySprite": "",
    "spriteAssets": {
      "leveltemple/bgleft": "/game/assets/pdzz/maps/leveltemple/bgleft.png",
      "leveltemple/bgright": "/game/assets/pdzz/maps/leveltemple/bgright.png",
      "leveltemple/foreground1": "/game/assets/pdzz/maps/leveltemple/foreground1.png",
      "leveltemple/ground": "/game/assets/pdzz/maps/leveltemple/ground.png",
      "leveltemple/belt": "/game/assets/pdzz/maps/leveltemple/frames/belt.png",
      "leveltemple/gears": "/game/assets/pdzz/maps/leveltemple/frames/gears.png",
      "leveltemple/platform1": "/game/assets/pdzz/maps/leveltemple/frames/platform1.png",
      "leveltemple/platform2": "/game/assets/pdzz/maps/leveltemple/frames/platform2.png",
      "leveltemple/platform4": "/game/assets/pdzz/maps/leveltemple/frames/platform4.png",
      "leveltemple/platform3": "/game/assets/pdzz/maps/leveltemple/frames/platform3.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1906,
          "y": -155
        },
        "angle": 0,
        "semanticKey": "bgright",
        "extension": {
          "tag": "",
          "sprite": "leveltemple/bgright",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 1004,
          "y": -151
        },
        "angle": 0,
        "semanticKey": "bgleft",
        "extension": {
          "tag": "",
          "sprite": "leveltemple/bgleft",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1075,
          "y": -289
        },
        "angle": 0,
        "semanticKey": "belt",
        "extension": {
          "tag": "",
          "sprite": "leveltemple/belt",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1076,
          "y": -507
        },
        "angle": 0,
        "semanticKey": "gears",
        "extension": {
          "tag": "",
          "sprite": "leveltemple/gears",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1074,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "gears",
        "extension": {
          "tag": "",
          "sprite": "leveltemple/gears",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 250,
          "y": 500
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "",
          "sprite": "leveltemple/ground",
          "spriteX": 526,
          "spriteY": -303,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 950,
          "height": 500,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 1200,
          "y": 500
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1877,
          "y": 310
        },
        "angle": 0,
        "semanticKey": "foreground1",
        "extension": {
          "tag": "",
          "sprite": "leveltemple/foreground1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2.2660000324249268,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 9,
        "position": {
          "x": 850,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "platform1",
        "extension": {
          "tag": "",
          "sprite": "leveltemple/platform1",
          "spriteX": 150,
          "spriteY": -25,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 10,
        "position": {
          "x": 1000,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "thwomptrigger",
        "extension": {
          "tag": "thwomptrigger",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 150,
          "height": 450,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 1000,
          "y": -500
        },
        "angle": 0,
        "semanticKey": "thwompcollider",
        "extension": {
          "tag": "thwompcollider",
          "sprite": "leveltemple/platform2",
          "spriteX": 75,
          "spriteY": -75,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 150,
          "height": 150,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": 1900,
          "y": -700
        },
        "angle": 0,
        "semanticKey": "platform4",
        "extension": {
          "tag": "",
          "sprite": "leveltemple/platform4",
          "spriteX": 125,
          "spriteY": -25,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 250,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 13,
        "position": {
          "x": 1350,
          "y": -800
        },
        "angle": 0,
        "semanticKey": "swingplatform",
        "extension": {
          "tag": "swingplatform",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 14,
        "position": {
          "x": 1450,
          "y": -1258
        },
        "angle": 0,
        "semanticKey": "platform3",
        "extension": {
          "tag": "",
          "sprite": "leveltemple/platform3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 15,
        "position": {
          "x": 838,
          "y": 280
        },
        "angle": 0,
        "semanticKey": "foreground1",
        "extension": {
          "tag": "",
          "sprite": "leveltemple/foreground1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2.967600107192993,
          "flipX": true,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "leveltram2",
    "sourceId": "leveltram",
    "name": "缆车",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 400,
    "minY": -1850,
    "width": 2250,
    "height": 2250,
    "editMinX": 400,
    "editMinY": -1600,
    "editWidth": 2250,
    "editHeight": 1700,
    "spawnX": 650,
    "spawnY": -1050,
    "finishX": 2300,
    "finishY": -300,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/leveltram2.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/leveltram2/leveltram2.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/leveltram2/leveltram2.png",
    "skySprite": "leveltram2/sky",
    "spriteAssets": {
      "leveltram2/building": "/game/assets/pdzz/maps/leveltram2/building.png",
      "leveltram2/snowmountain": "/game/assets/pdzz/maps/leveltram2/snowmountain.png",
      "leveltram2/top": "/game/assets/pdzz/maps/leveltram2/top.png",
      "leveltram2/tramblue": "/game/assets/pdzz/maps/leveltram2/tramblue.png",
      "leveltram2/sky": "/game/assets/pdzz/maps/leveltram2/frames/sky.png",
      "leveltram2/rope": "/game/assets/pdzz/maps/leveltram2/frames/rope.png",
      "leveltram2/tramfar": "/game/assets/pdzz/maps/leveltram2/frames/tramfar.png",
      "leveltram2/electricity": "/game/assets/pdzz/maps/leveltram2/frames/electricity.png",
      "leveltram2/tramred": "/game/assets/pdzz/maps/leveltram2/frames/tramred.png",
      "leveltram2/fence": "/game/assets/pdzz/maps/leveltram2/frames/fence.png",
      "leveltram2/roof": "/game/assets/pdzz/maps/leveltram2/frames/roof.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1837,
          "y": -463
        },
        "angle": 0,
        "semanticKey": "rope",
        "extension": {
          "tag": "",
          "sprite": "leveltram2/rope",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.5882353186607361,
          "isSliced": true,
          "slicedWidth": 3000,
          "slicedHeight": 6
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 1254,
          "y": -1214
        },
        "angle": 0,
        "semanticKey": "rope",
        "extension": {
          "tag": "",
          "sprite": "leveltram2/rope",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.5882353186607361,
          "isSliced": true,
          "slicedWidth": 3000,
          "slicedHeight": 6
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1400,
          "y": 14
        },
        "angle": 0,
        "semanticKey": "snowmountain",
        "extension": {
          "tag": "",
          "sprite": "leveltram2/snowmountain",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2.5999999046325684,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1306,
          "y": -940
        },
        "angle": 0,
        "semanticKey": "building",
        "extension": {
          "tag": "",
          "sprite": "leveltram2/building",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1336,
          "y": -1392
        },
        "angle": 0,
        "semanticKey": "rope",
        "extension": {
          "tag": "",
          "sprite": "leveltram2/rope",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.4901960790157318,
          "isSliced": true,
          "slicedWidth": 3000,
          "slicedHeight": 3
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1660,
          "y": -1314
        },
        "angle": 0,
        "semanticKey": "tramfar",
        "extension": {
          "tag": "",
          "sprite": "leveltram2/tramfar",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 2150,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "tramblue",
        "extension": {
          "tag": "tramblue",
          "sprite": "leveltram2/tramblue",
          "spriteX": 151,
          "spriteY": -261,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 250,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": 2100,
          "y": -553
        },
        "angle": 0,
        "semanticKey": "electricity",
        "extension": {
          "tag": "electricity",
          "sprite": "leveltram2/electricity",
          "spriteX": 209,
          "spriteY": -17,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 9,
        "position": {
          "x": 1100,
          "y": -600
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 350,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 10,
        "position": {
          "x": 500,
          "y": -800
        },
        "angle": 0,
        "semanticKey": "tramred",
        "extension": {
          "tag": "tramred",
          "sprite": "leveltram2/tramred",
          "spriteX": 149,
          "spriteY": -218,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 250,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 1050,
          "y": -950
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 500,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": 1100,
          "y": -1300
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 1001,
          "y": -1687
        },
        "angle": 0,
        "semanticKey": "top",
        "extension": {
          "tag": "",
          "sprite": "leveltram2/top",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 14,
        "position": {
          "x": 143,
          "y": -1600
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1400,
          "height": 150,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 15,
        "position": {
          "x": 1510,
          "y": -1675
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 75,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 1538,
          "y": -1700
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 17,
        "position": {
          "x": 1588,
          "y": -1706
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 43,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 18,
        "position": {
          "x": 235,
          "y": -1750
        },
        "angle": 0,
        "semanticKey": "snow",
        "extension": {
          "tag": "snow",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1400,
          "height": 15,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 19,
        "position": {
          "x": 1304,
          "y": -1115
        },
        "angle": 0,
        "semanticKey": "fence",
        "extension": {
          "tag": "",
          "sprite": "leveltram2/fence",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 20,
        "position": {
          "x": 1325,
          "y": -1426
        },
        "angle": 0,
        "semanticKey": "roof",
        "extension": {
          "tag": "",
          "sprite": "leveltram2/roof",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "leveltram3",
    "sourceId": "leveltram",
    "name": "缆车",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 400,
    "minY": -1850,
    "width": 2250,
    "height": 2250,
    "editMinX": 400,
    "editMinY": -1600,
    "editWidth": 2250,
    "editHeight": 1700,
    "spawnX": 650,
    "spawnY": -1050,
    "finishX": 2300,
    "finishY": -300,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/leveltram3.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/leveltram3/leveltram3.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/leveltram3/leveltram3.png",
    "skySprite": "leveltram3/sky",
    "spriteAssets": {
      "leveltram3/building": "/game/assets/pdzz/maps/leveltram3/building.png",
      "leveltram3/sky": "/game/assets/pdzz/maps/leveltram3/sky.png",
      "leveltram3/snowmountain": "/game/assets/pdzz/maps/leveltram3/snowmountain.png",
      "leveltram3/top": "/game/assets/pdzz/maps/leveltram3/top.png",
      "leveltram3/tramblue": "/game/assets/pdzz/maps/leveltram3/tramblue.png",
      "leveltram3/rope": "/game/assets/pdzz/maps/leveltram3/frames/rope.png",
      "leveltram3/tramfar": "/game/assets/pdzz/maps/leveltram3/frames/tramfar.png",
      "leveltram3/electricity": "/game/assets/pdzz/maps/leveltram3/frames/electricity.png",
      "leveltram3/tramred": "/game/assets/pdzz/maps/leveltram3/frames/tramred.png",
      "leveltram3/fence": "/game/assets/pdzz/maps/leveltram3/frames/fence.png",
      "leveltram3/roof": "/game/assets/pdzz/maps/leveltram3/frames/roof.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 1,
        "position": {
          "x": 1837,
          "y": -463
        },
        "angle": 0,
        "semanticKey": "rope",
        "extension": {
          "tag": "",
          "sprite": "leveltram3/rope",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.5882353186607361,
          "isSliced": true,
          "slicedWidth": 3000,
          "slicedHeight": 6
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 2,
        "position": {
          "x": 1254,
          "y": -1214
        },
        "angle": 0,
        "semanticKey": "rope",
        "extension": {
          "tag": "",
          "sprite": "leveltram3/rope",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.5882353186607361,
          "isSliced": true,
          "slicedWidth": 3000,
          "slicedHeight": 6
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1400,
          "y": 14
        },
        "angle": 0,
        "semanticKey": "snowmountain",
        "extension": {
          "tag": "",
          "sprite": "leveltram3/snowmountain",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2.5999999046325684,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1306,
          "y": -940
        },
        "angle": 0,
        "semanticKey": "building",
        "extension": {
          "tag": "",
          "sprite": "leveltram3/building",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1336,
          "y": -1392
        },
        "angle": 0,
        "semanticKey": "rope",
        "extension": {
          "tag": "",
          "sprite": "leveltram3/rope",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.4901960790157318,
          "isSliced": true,
          "slicedWidth": 3000,
          "slicedHeight": 3
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1660,
          "y": -1314
        },
        "angle": 0,
        "semanticKey": "tramfar",
        "extension": {
          "tag": "",
          "sprite": "leveltram3/tramfar",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 2150,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "tramblue",
        "extension": {
          "tag": "tramblue",
          "sprite": "leveltram3/tramblue",
          "spriteX": 151,
          "spriteY": -261,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 250,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": 2100,
          "y": -553
        },
        "angle": 0,
        "semanticKey": "electricity",
        "extension": {
          "tag": "electricity",
          "sprite": "leveltram3/electricity",
          "spriteX": 209,
          "spriteY": -17,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 9,
        "position": {
          "x": 1100,
          "y": -600
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 350,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 10,
        "position": {
          "x": 500,
          "y": -800
        },
        "angle": 0,
        "semanticKey": "tramred",
        "extension": {
          "tag": "tramred",
          "sprite": "leveltram3/tramred",
          "spriteX": 149,
          "spriteY": -218,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 300,
          "height": 250,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 11,
        "position": {
          "x": 1050,
          "y": -950
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 500,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 12,
        "position": {
          "x": 1100,
          "y": -1300
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 300,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 1001,
          "y": -1687
        },
        "angle": 0,
        "semanticKey": "top",
        "extension": {
          "tag": "",
          "sprite": "leveltram3/top",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 14,
        "position": {
          "x": 143,
          "y": -1600
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1400,
          "height": 150,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 15,
        "position": {
          "x": 1510,
          "y": -1675
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 75,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 16,
        "position": {
          "x": 1538,
          "y": -1700
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 17,
        "position": {
          "x": 1588,
          "y": -1706
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 43,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 18,
        "position": {
          "x": 235,
          "y": -1750
        },
        "angle": 0,
        "semanticKey": "snow",
        "extension": {
          "tag": "snow",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1400,
          "height": 15,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 19,
        "position": {
          "x": 1304,
          "y": -1115
        },
        "angle": 0,
        "semanticKey": "fence",
        "extension": {
          "tag": "",
          "sprite": "leveltram3/fence",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 20,
        "position": {
          "x": 1325,
          "y": -1426
        },
        "angle": 0,
        "semanticKey": "roof",
        "extension": {
          "tag": "",
          "sprite": "leveltram3/roof",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "leveltreehouse",
    "sourceId": "leveltreehouse",
    "name": "山谷",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": true,
    "noFlag": false,
    "minX": 150,
    "minY": -1650,
    "width": 2000,
    "height": 2000,
    "editMinX": 250,
    "editMinY": -1250,
    "editWidth": 1800,
    "editHeight": 1350,
    "spawnX": 541,
    "spawnY": -600,
    "finishX": 1800,
    "finishY": -600,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/leveltreehouse.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/leveltreehouse/leveltreehouse.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/leveltreehouse/leveltreehouse.png",
    "skySprite": "levelvalley/sky",
    "spriteAssets": {
      "levelvalley/bg": "/game/assets/pdzz/maps/leveltreehouse/bg.png",
      "levelvalley/leftbuilding": "/game/assets/pdzz/maps/leveltreehouse/leftbuilding.png",
      "levelvalley/rightbuilding": "/game/assets/pdzz/maps/leveltreehouse/rightbuilding.png",
      "levelvalley/sky": "/game/assets/pdzz/maps/leveltreehouse/sky.png",
      "levelvalley/cloud2": "/game/assets/pdzz/maps/leveltreehouse/frames/cloud2.png",
      "levelvalley/cloud3": "/game/assets/pdzz/maps/leveltreehouse/frames/cloud3.png",
      "levelvalley/cloud1": "/game/assets/pdzz/maps/leveltreehouse/frames/cloud1.png",
      "levelvalley/foreground3": "/game/assets/pdzz/maps/leveltreehouse/frames/foreground3.png",
      "levelvalley/foreground2": "/game/assets/pdzz/maps/leveltreehouse/frames/foreground2.png",
      "levelvalley/foreground1": "/game/assets/pdzz/maps/leveltreehouse/frames/foreground1.png"
    },
    "elements": [
      {
        "id": "parallax",
        "index": 1,
        "position": {
          "x": 1125,
          "y": -605
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "bg",
        "index": 2,
        "position": {
          "x": 1228,
          "y": -336
        },
        "angle": 0,
        "semanticKey": "bg",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/bg",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "bg",
        "index": 3,
        "position": {
          "x": 1914,
          "y": -1180
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "bg",
        "index": 4,
        "position": {
          "x": 562,
          "y": -1374
        },
        "angle": 0,
        "semanticKey": "cloud3",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/cloud3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "bg",
        "index": 5,
        "position": {
          "x": 1572,
          "y": -1489
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1777,
          "y": -66
        },
        "angle": 0,
        "semanticKey": "rightbuilding",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/rightbuilding",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 497,
          "y": -118
        },
        "angle": 0,
        "semanticKey": "leftbuilding",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/leftbuilding",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": -1,
        "position": {
          "x": 879,
          "y": 193
        },
        "angle": 0,
        "semanticKey": "foreground3",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/foreground3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.1581439971923828,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": -1,
        "position": {
          "x": 250,
          "y": 138
        },
        "angle": 0,
        "semanticKey": "foreground2",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/foreground2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.1581439971923828,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": -1,
        "position": {
          "x": 2077,
          "y": 108
        },
        "angle": 0,
        "semanticKey": "foreground1",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/foreground1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.1581439971923828,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": 1550,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 950,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 300,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 950,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "levelvalley",
    "sourceId": "leveltreehouse",
    "name": "山谷",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": true,
    "noFlag": false,
    "minX": 150,
    "minY": -1650,
    "width": 2000,
    "height": 2000,
    "editMinX": 250,
    "editMinY": -1250,
    "editWidth": 1800,
    "editHeight": 1350,
    "spawnX": 541,
    "spawnY": -600,
    "finishX": 1800,
    "finishY": -600,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelvalley.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelvalley/levelvalley.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelvalley/levelvalley.png",
    "skySprite": "levelvalley/sky",
    "spriteAssets": {
      "levelvalley/bg": "/game/assets/pdzz/maps/levelvalley/bg.png",
      "levelvalley/leftbuilding": "/game/assets/pdzz/maps/levelvalley/leftbuilding.png",
      "levelvalley/rightbuilding": "/game/assets/pdzz/maps/levelvalley/rightbuilding.png",
      "levelvalley/sky": "/game/assets/pdzz/maps/levelvalley/sky.png",
      "levelvalley/cloud2": "/game/assets/pdzz/maps/levelvalley/frames/cloud2.png",
      "levelvalley/cloud1": "/game/assets/pdzz/maps/levelvalley/frames/cloud1.png",
      "levelvalley/cloud3": "/game/assets/pdzz/maps/levelvalley/frames/cloud3.png",
      "levelvalley/foreground3": "/game/assets/pdzz/maps/levelvalley/frames/foreground3.png",
      "levelvalley/foreground2": "/game/assets/pdzz/maps/levelvalley/frames/foreground2.png",
      "levelvalley/foreground1": "/game/assets/pdzz/maps/levelvalley/frames/foreground1.png"
    },
    "elements": [
      {
        "id": "parallax",
        "index": 1,
        "position": {
          "x": 1125,
          "y": -605
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "parallax",
        "index": 1,
        "position": {
          "x": 1125,
          "y": -863
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 3,
        "position": {
          "x": 1228,
          "y": -336
        },
        "angle": 0,
        "semanticKey": "bg",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/bg",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 0.9450980424880981,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 4,
        "position": {
          "x": 1354,
          "y": -1180
        },
        "angle": 0,
        "semanticKey": "cloud2",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/cloud2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 933,
          "y": -1030
        },
        "angle": 0,
        "semanticKey": "cloud1",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/cloud1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 562,
          "y": -1374
        },
        "angle": 0,
        "semanticKey": "cloud3",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/cloud3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 1777,
          "y": -66
        },
        "angle": 0,
        "semanticKey": "rightbuilding",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/rightbuilding",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 497,
          "y": -118
        },
        "angle": 0,
        "semanticKey": "leftbuilding",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/leftbuilding",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": -1,
        "position": {
          "x": 879,
          "y": 193
        },
        "angle": 0,
        "semanticKey": "foreground3",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/foreground3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.1581439971923828,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": -1,
        "position": {
          "x": 250,
          "y": 138
        },
        "angle": 0,
        "semanticKey": "foreground2",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/foreground2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.1581439971923828,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": -1,
        "position": {
          "x": 2077,
          "y": 108
        },
        "angle": 0,
        "semanticKey": "foreground1",
        "extension": {
          "tag": "",
          "sprite": "levelvalley/foreground1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1.1581439971923828,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": 1550,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 950,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 300,
          "y": 350
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 400,
          "height": 950,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      }
    ]
  },
  {
    "id": "levelwestland",
    "sourceId": "levelfarm",
    "name": "西部",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 200,
    "minY": -1300,
    "width": 1900,
    "height": 1700,
    "editMinX": 300,
    "editMinY": -1100,
    "editWidth": 1700,
    "editHeight": 1200,
    "spawnX": 617,
    "spawnY": -100,
    "finishX": 1800,
    "finishY": -600,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelwestland.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelwestland/levelwestland.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelwestland/levelwestland.png",
    "skySprite": "levelwestland/sky",
    "spriteAssets": {
      "levelwestland/air": "/game/assets/pdzz/maps/levelwestland/air.png",
      "levelwestland/earth": "/game/assets/pdzz/maps/levelwestland/earth.png",
      "levelwestland/halo1": "/game/assets/pdzz/maps/levelwestland/halo1.png",
      "levelwestland/halo2": "/game/assets/pdzz/maps/levelwestland/halo2.png",
      "levelwestland/pub": "/game/assets/pdzz/maps/levelwestland/pub.png",
      "levelwestland/scene2": "/game/assets/pdzz/maps/levelwestland/scene2.png",
      "levelwestland/scene3": "/game/assets/pdzz/maps/levelwestland/scene3.png",
      "levelwestland/scene4": "/game/assets/pdzz/maps/levelwestland/scene4.png",
      "levelwestland/scene5": "/game/assets/pdzz/maps/levelwestland/scene5.png",
      "levelwestland/sky": "/game/assets/pdzz/maps/levelwestland/sky.png",
      "levelwestland/sun": "/game/assets/pdzz/maps/levelwestland/sun.png",
      "levelwestland/watertower": "/game/assets/pdzz/maps/levelwestland/watertower.png",
      "levelwestland/scene11": "/game/assets/pdzz/maps/levelwestland/frames/scene11.png",
      "levelwestland/cacti5": "/game/assets/pdzz/maps/levelwestland/frames/cacti5.png",
      "levelwestland/cacti4": "/game/assets/pdzz/maps/levelwestland/frames/cacti4.png",
      "levelwestland/scene13": "/game/assets/pdzz/maps/levelwestland/frames/scene13.png",
      "levelwestland/grass2": "/game/assets/pdzz/maps/levelwestland/frames/grass2.png",
      "levelwestland/cacti2": "/game/assets/pdzz/maps/levelwestland/frames/cacti2.png",
      "levelwestland/scene12": "/game/assets/pdzz/maps/levelwestland/frames/scene12.png",
      "levelwestland/grass4": "/game/assets/pdzz/maps/levelwestland/frames/grass4.png",
      "levelwestland/stone": "/game/assets/pdzz/maps/levelwestland/frames/stone.png",
      "levelwestland/cacti3": "/game/assets/pdzz/maps/levelwestland/frames/cacti3.png",
      "levelwestland/grass3": "/game/assets/pdzz/maps/levelwestland/frames/grass3.png",
      "levelwestland/origin": "/game/assets/pdzz/maps/levelwestland/frames/origin.png",
      "levelwestland/cacti1": "/game/assets/pdzz/maps/levelwestland/frames/cacti1.png",
      "levelwestland/grass": "/game/assets/pdzz/maps/levelwestland/frames/grass.png",
      "levelwestland/smoke0": "/game/assets/pdzz/maps/levelwestland/frames/smoke0.png",
      "levelwestland/mower_saw": "/game/assets/pdzz/maps/levelwestland/frames/mower_saw.png",
      "levelwestland/vehicle": "/game/assets/pdzz/maps/levelwestland/frames/vehicle.png",
      "levelwestland/spark0": "/game/assets/pdzz/maps/levelwestland/frames/spark0.png",
      "levelwestland/tumbleweed": "/game/assets/pdzz/maps/levelwestland/frames/tumbleweed.png",
      "levelwestland/eagle0": "/game/assets/pdzz/maps/levelwestland/frames/eagle0.png",
      "levelwestland/halo3": "/game/assets/pdzz/maps/levelwestland/frames/halo3.png",
      "levelwestland/mower_tyre": "/game/assets/pdzz/maps/levelwestland/frames/mower_tyre.png",
      "levelwestland/mower_tyre_big": "/game/assets/pdzz/maps/levelwestland/frames/mower_tyre_big.png",
      "levelwestland/barbedwire": "/game/assets/pdzz/maps/levelwestland/frames/barbedwire.png",
      "levelwestland/sign": "/game/assets/pdzz/maps/levelwestland/frames/sign.png"
    },
    "elements": [
      {
        "id": "parallax",
        "index": 1,
        "position": {
          "x": 1125,
          "y": -407
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "parallax",
        "index": 2,
        "position": {
          "x": 1125,
          "y": -163
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "parallax",
        "index": 3,
        "position": {
          "x": 1125,
          "y": 74
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "parallax",
        "index": 5,
        "position": {
          "x": 1125,
          "y": -360
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "parallax",
        "index": 4,
        "position": {
          "x": 1125,
          "y": -360
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 7,
        "position": {
          "x": 1294,
          "y": -384
        },
        "angle": 0,
        "semanticKey": "sun",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/sun",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 8,
        "position": {
          "x": 1111,
          "y": -440
        },
        "angle": 0,
        "semanticKey": "scene5",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/scene5",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 1091,
          "y": -365
        },
        "angle": 0,
        "semanticKey": "scene4",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/scene4",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 1379,
          "y": -306
        },
        "angle": 0,
        "semanticKey": "halobig",
        "extension": {
          "tag": "halobig",
          "sprite": "levelwestland/halo1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 1088,
          "y": -172
        },
        "angle": 0,
        "semanticKey": "scene3",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/scene3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 12,
        "position": {
          "x": 1036,
          "y": -116
        },
        "angle": 0,
        "semanticKey": "scene2",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/scene2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 367,
          "y": -350
        },
        "angle": 0,
        "semanticKey": "watertower",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/watertower",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 14,
        "position": {
          "x": 764,
          "y": 92
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/scene11",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 16,
        "position": {
          "x": 1464,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/cacti5",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 19,
        "position": {
          "x": 1441,
          "y": -12
        },
        "angle": 0,
        "semanticKey": "cacti4",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/cacti4",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 20,
        "position": {
          "x": 1799,
          "y": -78
        },
        "angle": 0,
        "semanticKey": "scene13",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/scene13",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 22,
        "position": {
          "x": 738,
          "y": 8
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 23,
        "position": {
          "x": 1358,
          "y": 5
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/cacti2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 24,
        "position": {
          "x": 878,
          "y": 29
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/scene12",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 25,
        "position": {
          "x": 465,
          "y": 5
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass4",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 26,
        "position": {
          "x": 1003,
          "y": -9
        },
        "angle": 0,
        "semanticKey": "stone",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/stone",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 27,
        "position": {
          "x": 1400,
          "y": -19
        },
        "angle": 0,
        "semanticKey": "cacti3",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/cacti3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 28,
        "position": {
          "x": 960,
          "y": 5
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 29,
        "position": {
          "x": 600,
          "y": -42
        },
        "angle": 0,
        "semanticKey": "origin",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/origin",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 30,
        "position": {
          "x": 1518,
          "y": 8
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/cacti1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 31,
        "position": {
          "x": 795,
          "y": 12
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 32,
        "position": {
          "x": 1333,
          "y": -58
        },
        "angle": 0,
        "semanticKey": "smoke",
        "extension": {
          "tag": "smoke",
          "sprite": "levelwestland/smoke0",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 33,
        "position": {
          "x": 1121,
          "y": -77
        },
        "angle": 0,
        "semanticKey": "mower_saw",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/mower_saw",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 6,
        "position": {
          "x": 1150,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mower",
        "extension": {
          "tag": "mower",
          "sprite": "levelwestland/vehicle",
          "spriteX": 53,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 35,
        "position": {
          "x": 1134,
          "y": -89
        },
        "angle": 0,
        "semanticKey": "spark",
        "extension": {
          "tag": "spark",
          "sprite": "levelwestland/spark0",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 15,
        "position": {
          "x": -300,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "ground",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 3000,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 37,
        "position": {
          "x": 910,
          "y": -69
        },
        "angle": 0,
        "semanticKey": "ball",
        "extension": {
          "tag": "ball",
          "sprite": "levelwestland/tumbleweed",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 20,
          "rotation": 0,
          "hazard": true,
          "colliderType": 2
        }
      },
      {
        "id": "scene",
        "index": 38,
        "position": {
          "x": 1552,
          "y": -880
        },
        "angle": 0,
        "semanticKey": "eagle",
        "extension": {
          "tag": "eagle",
          "sprite": "levelwestland/eagle0",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 39,
        "position": {
          "x": 961,
          "y": -1141
        },
        "angle": 0,
        "semanticKey": "halomiddle",
        "extension": {
          "tag": "halomiddle",
          "sprite": "levelwestland/halo2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 40,
        "position": {
          "x": 858,
          "y": -1259
        },
        "angle": 0,
        "semanticKey": "halosmall",
        "extension": {
          "tag": "halosmall",
          "sprite": "levelwestland/halo3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 0.7102900147438049,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 41,
        "position": {
          "x": 1108,
          "y": 11
        },
        "angle": 0,
        "semanticKey": "mowerhopper",
        "extension": {
          "tag": "mowerhopper",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 190,
          "height": 40,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 42,
        "position": {
          "x": 1100,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mowersaw",
        "extension": {
          "tag": "mowersaw",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 105,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 43,
        "position": {
          "x": 1252,
          "y": -44
        },
        "angle": 0,
        "semanticKey": "mowerspike",
        "extension": {
          "tag": "mowerspike",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 21,
        "position": {
          "x": 500,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 17,
        "position": {
          "x": 600,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 18,
        "position": {
          "x": 1550,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "house",
        "extension": {
          "tag": "house",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 600,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 47,
        "position": {
          "x": 1300,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 250,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 48,
        "position": {
          "x": 1350,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 49,
        "position": {
          "x": 1274,
          "y": -18
        },
        "angle": 0,
        "semanticKey": "tyre",
        "extension": {
          "tag": "tyre",
          "sprite": "levelwestland/mower_tyre",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 50,
        "position": {
          "x": 1222,
          "y": -18
        },
        "angle": 0,
        "semanticKey": "tyre",
        "extension": {
          "tag": "tyre",
          "sprite": "levelwestland/mower_tyre",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 51,
        "position": {
          "x": 1122,
          "y": -15
        },
        "angle": 0,
        "semanticKey": "tyre",
        "extension": {
          "tag": "tyre",
          "sprite": "levelwestland/mower_tyre_big",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 52,
        "position": {
          "x": 1441,
          "y": -53
        },
        "angle": 0,
        "semanticKey": "barbedwire",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/barbedwire",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 53,
        "position": {
          "x": 1430,
          "y": 16
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/sign",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 54,
        "position": {
          "x": 1149,
          "y": 258
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "ground",
          "sprite": "levelwestland/earth",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2590,
          "slicedHeight": 522
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 55,
        "position": {
          "x": 1776,
          "y": -298
        },
        "angle": 0,
        "semanticKey": "pub",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/pub",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "levelwestlandbattle",
    "sourceId": "levelfarmbattle",
    "name": "西部对战",
    "available": true,
    "supportTeamBattle": true,
    "supportAIBattle": false,
    "noFlag": false,
    "minX": 200,
    "minY": -1300,
    "width": 2200,
    "height": 1700,
    "editMinX": 300,
    "editMinY": -1100,
    "editWidth": 2000,
    "editHeight": 1200,
    "spawnX": 600,
    "spawnY": -100,
    "finishX": 2000,
    "finishY": -100,
    "secondarySpawnPoints": [
      {
        "x": 2000,
        "y": -100
      }
    ],
    "secondaryFinishPoints": [
      {
        "x": 600,
        "y": -100
      }
    ],
    "backgroundAsset": null,
    "thumbnailAsset": "/game/assets/pdzz/icons/levelwestlandbattle.jpg",
    "atlasAsset": "/game/assets/pdzz/maps/levelwestlandbattle/levelwestlandbattle.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/levelwestlandbattle/levelwestlandbattle.png",
    "skySprite": "levelwestland/sky",
    "spriteAssets": {
      "levelwestland/air": "/game/assets/pdzz/maps/levelwestlandbattle/air.png",
      "levelwestland/earth": "/game/assets/pdzz/maps/levelwestlandbattle/earth.png",
      "levelwestland/halo1": "/game/assets/pdzz/maps/levelwestlandbattle/halo1.png",
      "levelwestland/halo2": "/game/assets/pdzz/maps/levelwestlandbattle/halo2.png",
      "levelwestland/pub": "/game/assets/pdzz/maps/levelwestlandbattle/pub.png",
      "levelwestland/scene2": "/game/assets/pdzz/maps/levelwestlandbattle/scene2.png",
      "levelwestland/scene3": "/game/assets/pdzz/maps/levelwestlandbattle/scene3.png",
      "levelwestland/scene4": "/game/assets/pdzz/maps/levelwestlandbattle/scene4.png",
      "levelwestland/scene5": "/game/assets/pdzz/maps/levelwestlandbattle/scene5.png",
      "levelwestland/sky": "/game/assets/pdzz/maps/levelwestlandbattle/sky.png",
      "levelwestland/sun": "/game/assets/pdzz/maps/levelwestlandbattle/sun.png",
      "levelwestland/watertower": "/game/assets/pdzz/maps/levelwestlandbattle/watertower.png",
      "levelwestland/scene11": "/game/assets/pdzz/maps/levelwestlandbattle/frames/scene11.png",
      "levelwestland/cacti5": "/game/assets/pdzz/maps/levelwestlandbattle/frames/cacti5.png",
      "levelwestland/scene12": "/game/assets/pdzz/maps/levelwestlandbattle/frames/scene12.png",
      "levelwestland/grass2": "/game/assets/pdzz/maps/levelwestlandbattle/frames/grass2.png",
      "levelwestland/grass4": "/game/assets/pdzz/maps/levelwestlandbattle/frames/grass4.png",
      "levelwestland/stone": "/game/assets/pdzz/maps/levelwestlandbattle/frames/stone.png",
      "levelwestland/grass3": "/game/assets/pdzz/maps/levelwestlandbattle/frames/grass3.png",
      "levelwestland/cacti1": "/game/assets/pdzz/maps/levelwestlandbattle/frames/cacti1.png",
      "levelwestland/grass": "/game/assets/pdzz/maps/levelwestlandbattle/frames/grass.png",
      "levelwestland/smoke0": "/game/assets/pdzz/maps/levelwestlandbattle/frames/smoke0.png",
      "levelwestland/mower_saw": "/game/assets/pdzz/maps/levelwestlandbattle/frames/mower_saw.png",
      "levelwestland/vehicle": "/game/assets/pdzz/maps/levelwestlandbattle/frames/vehicle.png",
      "levelwestland/spark0": "/game/assets/pdzz/maps/levelwestlandbattle/frames/spark0.png",
      "levelwestland/origin": "/game/assets/pdzz/maps/levelwestlandbattle/frames/origin.png",
      "levelwestland/tumbleweed": "/game/assets/pdzz/maps/levelwestlandbattle/frames/tumbleweed.png",
      "levelwestland/eagle0": "/game/assets/pdzz/maps/levelwestlandbattle/frames/eagle0.png",
      "levelwestland/halo3": "/game/assets/pdzz/maps/levelwestlandbattle/frames/halo3.png",
      "levelwestland/mower_tyre": "/game/assets/pdzz/maps/levelwestlandbattle/frames/mower_tyre.png",
      "levelwestland/mower_tyre_big": "/game/assets/pdzz/maps/levelwestlandbattle/frames/mower_tyre_big.png",
      "levelwestland/barbedwire": "/game/assets/pdzz/maps/levelwestlandbattle/frames/barbedwire.png"
    },
    "elements": [
      {
        "id": "parallax",
        "index": 1,
        "position": {
          "x": 1125,
          "y": -407
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "parallax",
        "index": 2,
        "position": {
          "x": 1125,
          "y": -163
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "parallax",
        "index": 3,
        "position": {
          "x": 1125,
          "y": 74
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "parallax",
        "index": 4,
        "position": {
          "x": 1125,
          "y": -360
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "parallax",
        "index": 5,
        "position": {
          "x": 1125,
          "y": -360
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 6,
        "position": {
          "x": 1294,
          "y": -384
        },
        "angle": 0,
        "semanticKey": "sun",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/sun",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 9,
        "position": {
          "x": 1111,
          "y": -440
        },
        "angle": 0,
        "semanticKey": "scene5",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/scene5",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 10,
        "position": {
          "x": 1091,
          "y": -365
        },
        "angle": 0,
        "semanticKey": "scene4",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/scene4",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 11,
        "position": {
          "x": 1379,
          "y": -306
        },
        "angle": 0,
        "semanticKey": "halobig",
        "extension": {
          "tag": "halobig",
          "sprite": "levelwestland/halo1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 12,
        "position": {
          "x": 1088,
          "y": -172
        },
        "angle": 0,
        "semanticKey": "scene3",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/scene3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 13,
        "position": {
          "x": 764,
          "y": 92
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/scene11",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 14,
        "position": {
          "x": 2280,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/cacti5",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 15,
        "position": {
          "x": 326,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/cacti5",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 16,
        "position": {
          "x": 1820,
          "y": 92
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/scene11",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": true,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 17,
        "position": {
          "x": 1722,
          "y": 29
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/scene12",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": true,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 18,
        "position": {
          "x": 1653,
          "y": 8
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 19,
        "position": {
          "x": 738,
          "y": 8
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 20,
        "position": {
          "x": 878,
          "y": 29
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/scene12",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 21,
        "position": {
          "x": 465,
          "y": 5
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass4",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 23,
        "position": {
          "x": 2155,
          "y": 5
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass4",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 24,
        "position": {
          "x": 1003,
          "y": -9
        },
        "angle": 0,
        "semanticKey": "stone",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/stone",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 26,
        "position": {
          "x": 960,
          "y": 5
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 29,
        "position": {
          "x": 1875,
          "y": 5
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 31,
        "position": {
          "x": 371,
          "y": 8
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/cacti1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 32,
        "position": {
          "x": 2228,
          "y": 8
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/cacti1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 33,
        "position": {
          "x": 1568,
          "y": 12
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 34,
        "position": {
          "x": 795,
          "y": 12
        },
        "angle": 0,
        "semanticKey": "swing",
        "extension": {
          "tag": "swing",
          "sprite": "levelwestland/grass",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 35,
        "position": {
          "x": 1267,
          "y": -58
        },
        "angle": 0,
        "semanticKey": "smoke_r",
        "extension": {
          "tag": "smoke_r",
          "sprite": "levelwestland/smoke0",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 36,
        "position": {
          "x": 1333,
          "y": -58
        },
        "angle": 0,
        "semanticKey": "smoke_l",
        "extension": {
          "tag": "smoke_l",
          "sprite": "levelwestland/smoke0",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 37,
        "position": {
          "x": 1477,
          "y": -77
        },
        "angle": 0,
        "semanticKey": "mowersaw_r",
        "extension": {
          "tag": "mowersaw_r",
          "sprite": "levelwestland/mower_saw",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 38,
        "position": {
          "x": 1121,
          "y": -77
        },
        "angle": 0,
        "semanticKey": "mowersaw_l",
        "extension": {
          "tag": "mowersaw_l",
          "sprite": "levelwestland/mower_saw",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 8,
        "position": {
          "x": 1350,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mower_r",
        "extension": {
          "tag": "mower_r",
          "sprite": "levelwestland/vehicle",
          "spriteX": 47,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 7,
        "position": {
          "x": 1150,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mower_l",
        "extension": {
          "tag": "mower_l",
          "sprite": "levelwestland/vehicle",
          "spriteX": 53,
          "spriteY": -50,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 100,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 41,
        "position": {
          "x": 1134,
          "y": -89
        },
        "angle": 0,
        "semanticKey": "spark_l",
        "extension": {
          "tag": "spark_l",
          "sprite": "levelwestland/spark0",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 42,
        "position": {
          "x": 1466,
          "y": -89
        },
        "angle": 0,
        "semanticKey": "spark_r",
        "extension": {
          "tag": "spark_r",
          "sprite": "levelwestland/spark0",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 43,
        "position": {
          "x": 1999,
          "y": -42
        },
        "angle": 0,
        "semanticKey": "origin",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/origin",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 44,
        "position": {
          "x": 600,
          "y": -42
        },
        "angle": 0,
        "semanticKey": "origin",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/origin",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "circlecollider",
        "index": 45,
        "position": {
          "x": 2187,
          "y": -76
        },
        "angle": 0,
        "semanticKey": "ball",
        "extension": {
          "tag": "ball",
          "sprite": "levelwestland/tumbleweed",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 20,
          "rotation": 0,
          "hazard": true,
          "colliderType": 2
        }
      },
      {
        "id": "scene",
        "index": 46,
        "position": {
          "x": 2526,
          "y": -298
        },
        "angle": 0,
        "semanticKey": "pub",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/pub",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 47,
        "position": {
          "x": 74,
          "y": -298
        },
        "angle": 0,
        "semanticKey": "pub",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/pub",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 48,
        "position": {
          "x": 1552,
          "y": -880
        },
        "angle": 0,
        "semanticKey": "eagle",
        "extension": {
          "tag": "eagle",
          "sprite": "levelwestland/eagle0",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 2,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 49,
        "position": {
          "x": 961,
          "y": -1141
        },
        "angle": 0,
        "semanticKey": "halomiddle",
        "extension": {
          "tag": "halomiddle",
          "sprite": "levelwestland/halo2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 50,
        "position": {
          "x": 858,
          "y": -1259
        },
        "angle": 0,
        "semanticKey": "halosmall",
        "extension": {
          "tag": "halosmall",
          "sprite": "levelwestland/halo3",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 0.7102900147438049,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 51,
        "position": {
          "x": 1308,
          "y": 11
        },
        "angle": 0,
        "semanticKey": "mowerhopper_r",
        "extension": {
          "tag": "mowerhopper_r",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 190,
          "height": 40,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 52,
        "position": {
          "x": 1108,
          "y": 11
        },
        "angle": 0,
        "semanticKey": "mowerhopper_l",
        "extension": {
          "tag": "mowerhopper_l",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 190,
          "height": 40,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 53,
        "position": {
          "x": 1450,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mowersaw_r",
        "extension": {
          "tag": "mowersaw_r",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 105,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 54,
        "position": {
          "x": 1100,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "mowersaw_l",
        "extension": {
          "tag": "mowersaw_l",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 105,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 55,
        "position": {
          "x": 1252,
          "y": -44
        },
        "angle": 0,
        "semanticKey": "mowerspike_l",
        "extension": {
          "tag": "mowerspike_l",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 56,
        "position": {
          "x": 1299,
          "y": -44
        },
        "angle": 0,
        "semanticKey": "mowerspike_r",
        "extension": {
          "tag": "mowerspike_r",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 57,
        "position": {
          "x": 200,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 58,
        "position": {
          "x": 2200,
          "y": -50
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": true,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 22,
        "position": {
          "x": -200,
          "y": 400
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "ground",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 3000,
          "height": 400,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 25,
        "position": {
          "x": 500,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 28,
        "position": {
          "x": 1900,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 200,
          "height": 100,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 27,
        "position": {
          "x": 2300,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 600,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 30,
        "position": {
          "x": -150,
          "y": 0
        },
        "angle": 0,
        "semanticKey": "",
        "extension": {
          "tag": "",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 450,
          "height": 600,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": 64,
        "position": {
          "x": 1380,
          "y": -18
        },
        "angle": 0,
        "semanticKey": "tyre_r",
        "extension": {
          "tag": "tyre_r",
          "sprite": "levelwestland/mower_tyre",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 65,
        "position": {
          "x": 1327,
          "y": -18
        },
        "angle": 0,
        "semanticKey": "tyre_r",
        "extension": {
          "tag": "tyre_r",
          "sprite": "levelwestland/mower_tyre",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 66,
        "position": {
          "x": 1274,
          "y": -18
        },
        "angle": 0,
        "semanticKey": "tyre_l",
        "extension": {
          "tag": "tyre_l",
          "sprite": "levelwestland/mower_tyre",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 67,
        "position": {
          "x": 1222,
          "y": -18
        },
        "angle": 0,
        "semanticKey": "tyre_l",
        "extension": {
          "tag": "tyre_l",
          "sprite": "levelwestland/mower_tyre",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 68,
        "position": {
          "x": 1122,
          "y": -15
        },
        "angle": 0,
        "semanticKey": "tyre_l",
        "extension": {
          "tag": "tyre_l",
          "sprite": "levelwestland/mower_tyre_big",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 69,
        "position": {
          "x": 1478,
          "y": -15
        },
        "angle": 0,
        "semanticKey": "tyre_r",
        "extension": {
          "tag": "tyre_r",
          "sprite": "levelwestland/mower_tyre_big",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 70,
        "position": {
          "x": 1149,
          "y": 258
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "ground",
          "sprite": "levelwestland/earth",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2590,
          "slicedHeight": 522
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 71,
        "position": {
          "x": 250,
          "y": -51
        },
        "angle": 0,
        "semanticKey": "barbedwire",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/barbedwire",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": 72,
        "position": {
          "x": 2349,
          "y": -51
        },
        "angle": 0,
        "semanticKey": "barbedwire",
        "extension": {
          "tag": "",
          "sprite": "levelwestland/barbedwire",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": -1,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  },
  {
    "id": "templatetower",
    "sourceId": "templatetower",
    "name": "高塔模板",
    "available": true,
    "supportTeamBattle": false,
    "supportAIBattle": false,
    "noFlag": true,
    "minX": 200,
    "minY": -2050,
    "width": 1950,
    "height": 2500,
    "editMinX": 350,
    "editMinY": -1600,
    "editWidth": 1650,
    "editHeight": 1650,
    "spawnX": 541,
    "spawnY": -600,
    "finishX": 1800,
    "finishY": -600,
    "secondarySpawnPoints": [],
    "secondaryFinishPoints": [],
    "backgroundAsset": null,
    "thumbnailAsset": null,
    "atlasAsset": "/game/assets/pdzz/maps/templatetower/templatetower.json",
    "atlasImageAsset": "/game/assets/pdzz/maps/templatetower/templatetower.png",
    "skySprite": "",
    "spriteAssets": {
      "templatetower/ground": "/game/assets/pdzz/maps/templatetower/frames/ground.png",
      "templatetower/wall": "/game/assets/pdzz/maps/templatetower/frames/wall.png",
      "templatetower/roof2": "/game/assets/pdzz/maps/templatetower/frames/roof2.png",
      "templatetower/roof1": "/game/assets/pdzz/maps/templatetower/frames/roof1.png"
    },
    "elements": [
      {
        "id": "scene",
        "index": 5,
        "position": {
          "x": 1175,
          "y": 338
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "ground",
          "sprite": "templatetower/ground",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 1750,
          "slicedHeight": 580
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": -1,
        "position": {
          "x": 2024,
          "y": -507
        },
        "angle": 90,
        "semanticKey": "wallright",
        "extension": {
          "tag": "wallright",
          "sprite": "templatetower/wall",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2260,
          "slicedHeight": 51
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": -1,
        "position": {
          "x": 324,
          "y": -507
        },
        "angle": 90,
        "semanticKey": "wallleft",
        "extension": {
          "tag": "wallleft",
          "sprite": "templatetower/wall",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 1,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 2260,
          "slicedHeight": 51
        },
        "collider": null
      },
      {
        "id": "boxcollider",
        "index": 4,
        "position": {
          "x": 300,
          "y": 650
        },
        "angle": 0,
        "semanticKey": "ground",
        "extension": {
          "tag": "ground",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1750,
          "height": 600,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 1,
        "position": {
          "x": 300,
          "y": 100
        },
        "angle": 0,
        "semanticKey": "wallleft",
        "extension": {
          "tag": "wallleft",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 1750,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 2,
        "position": {
          "x": 2000,
          "y": 100
        },
        "angle": 0,
        "semanticKey": "wallright",
        "extension": {
          "tag": "wallright",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 50,
          "height": 1750,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "circlecollider",
        "index": 6,
        "position": {
          "x": 350,
          "y": 50
        },
        "angle": 0,
        "semanticKey": "pivot",
        "extension": {
          "tag": "pivot",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "circle",
          "width": null,
          "height": null,
          "radius": 20,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "boxcollider",
        "index": 3,
        "position": {
          "x": 300,
          "y": -1600
        },
        "angle": 0,
        "semanticKey": "roof",
        "extension": {
          "tag": "roof",
          "sprite": "",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": {
          "shape": "box",
          "width": 1750,
          "height": 50,
          "radius": null,
          "rotation": 0,
          "hazard": false,
          "colliderType": 0
        }
      },
      {
        "id": "scene",
        "index": -1,
        "position": {
          "x": 1175,
          "y": -1654
        },
        "angle": 0,
        "semanticKey": "roof",
        "extension": {
          "tag": "roof",
          "sprite": "templatetower/roof2",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": true,
          "slicedWidth": 1560,
          "slicedHeight": 110
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": -1,
        "position": {
          "x": 2033,
          "y": -1654
        },
        "angle": 0,
        "semanticKey": "roofright",
        "extension": {
          "tag": "roofright",
          "sprite": "templatetower/roof1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": true,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      },
      {
        "id": "scene",
        "index": -1,
        "position": {
          "x": 319,
          "y": -1654
        },
        "angle": 0,
        "semanticKey": "roofleft",
        "extension": {
          "tag": "roofleft",
          "sprite": "templatetower/roof1",
          "spriteX": 0,
          "spriteY": 0,
          "scale": 1,
          "flipX": false,
          "flipY": false,
          "zOrder": 0,
          "alpha": 1,
          "isSliced": false,
          "slicedWidth": 0,
          "slicedHeight": 0
        },
        "collider": null
      }
    ]
  }
]
export const PDZZ_COMPONENTS: PdzzComponentDefinition[] = [
  {
    "id": "platform1x1",
    "name": "1x1平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 1,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "platform1x1.png",
    "iconAsset": "/game/assets/pdzz/component-frames/platform1x1.png",
    "iconCrop": {
      "x": 733,
      "y": 859,
      "width": 53,
      "height": 51
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "pumpkin",
    "name": "1x1平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 1,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "pumpkin.png",
    "iconAsset": "/game/assets/pdzz/component-frames/pumpkin.png",
    "iconCrop": {
      "x": 613,
      "y": 744,
      "width": 53,
      "height": 54
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "platform2x1",
    "name": "2x1平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 2,
    "height": 1,
    "viewWidth": 2,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 1,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "platform2x1.png",
    "iconAsset": "/game/assets/pdzz/component-frames/platform2x1.png",
    "iconCrop": {
      "x": 251,
      "y": 199,
      "width": 104,
      "height": 51
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "platform5x1",
    "name": "5x1平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 5,
    "height": 1,
    "viewWidth": 5,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ],
      [
        3,
        0
      ],
      [
        4,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 1,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "platform5x1.png",
    "iconAsset": "/game/assets/pdzz/component-frames/platform5x1.png",
    "iconCrop": {
      "x": 453,
      "y": 447,
      "width": 253,
      "height": 51
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "nowallblock",
    "name": "特殊1x1平台",
    "description": "nowallblock · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "nowallblock",
    "componentType": 34,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 1,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "nowallblock.png",
    "iconAsset": "/game/assets/pdzz/component-frames/nowallblock.png",
    "iconCrop": {
      "x": 462,
      "y": 903,
      "width": 54,
      "height": 51
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "roundplatform2x2",
    "name": "轮胎",
    "description": "roundplatform · 来自 APK 组件配置",
    "width": 2,
    "height": 2,
    "viewWidth": 2,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "roundplatform",
    "componentType": 4,
    "defaultDir": 1,
    "rotateMode": 2,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 2,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "roundplatform2x2.png",
    "iconAsset": "/game/assets/pdzz/component-frames/roundplatform2x2.png",
    "iconCrop": {
      "x": 207,
      "y": 359,
      "width": 98,
      "height": 97
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "onewayplatform",
    "name": "云",
    "description": "onewayplatform · 来自 APK 组件配置",
    "width": 2,
    "height": 1,
    "viewWidth": 2,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "onewayplatform",
    "componentType": 16,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 7,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "onewayplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/onewayplatform.png",
    "iconCrop": {
      "x": 136,
      "y": 1011,
      "width": 110,
      "height": 54
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "onewayplatformstatic",
    "name": "木板",
    "description": "onewayplatform · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "onewayplatform",
    "componentType": 16,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 9,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "onewayplatformstatic.png",
    "iconAsset": "/game/assets/pdzz/component-frames/onewayplatformstatic.png",
    "iconCrop": {
      "x": 101,
      "y": 1085,
      "width": 54,
      "height": 19
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "tshape",
    "name": "T平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 3,
    "height": 2,
    "viewWidth": 3,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ],
      [
        1,
        1
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 1,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "tshape.png",
    "iconAsset": "/game/assets/pdzz/component-frames/tshape.png",
    "iconCrop": {
      "x": 189,
      "y": 457,
      "width": 157,
      "height": 105
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "ishape",
    "name": "I平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 1,
    "height": 4,
    "viewWidth": 1,
    "viewHeight": 4,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        0,
        2
      ],
      [
        0,
        3
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 5,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "ishape.png",
    "iconAsset": "/game/assets/pdzz/component-frames/ishape.png",
    "iconCrop": {
      "x": 354,
      "y": 738,
      "width": 52,
      "height": 205
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "lshape",
    "name": "新L平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 2,
    "height": 3,
    "viewWidth": 2,
    "viewHeight": 3,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        0,
        2
      ],
      [
        1,
        2
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 1,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "lshape.png",
    "iconAsset": "/game/assets/pdzz/component-frames/lshape.png",
    "iconCrop": {
      "x": 347,
      "y": 359,
      "width": 105,
      "height": 153
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "girder",
    "name": "L平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 4,
    "height": 4,
    "viewWidth": 4,
    "viewHeight": 4,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        0,
        2
      ],
      [
        0,
        3
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ],
      [
        3,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 3,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "girder.png",
    "iconAsset": "/game/assets/pdzz/component-frames/girder.png",
    "iconCrop": {
      "x": 0,
      "y": 251,
      "width": 206,
      "height": 205
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "pushableplatform",
    "name": "箱子",
    "description": "pushableplatform · 来自 APK 组件配置",
    "width": 2,
    "height": 2,
    "viewWidth": 2,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "pushableplatform",
    "componentType": 19,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 4,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "pushableplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/pushableplatform.png",
    "iconCrop": {
      "x": 595,
      "y": 121,
      "width": 105,
      "height": 104
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "blueplatform",
    "name": "蓝平台",
    "description": "moveplatform · 来自 APK 组件配置",
    "width": 3,
    "height": 1,
    "viewWidth": 6,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "moveplatform",
    "componentType": 5,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 2,
    "isVip": false,
    "available": true,
    "iconSource": "component",
    "iconFrame": "blueplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/blueplatform.png",
    "iconCrop": {
      "x": 382,
      "y": 442,
      "width": 140,
      "height": 28
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "yellowplatform",
    "name": "橙平台",
    "description": "moveplatform · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 6,
    "viewHeight": 6,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "moveplatform",
    "componentType": 5,
    "defaultDir": 1,
    "rotateMode": 2,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 4,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "yellowplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/yellowplatform.png",
    "iconCrop": {
      "x": 837,
      "y": 704,
      "width": 54,
      "height": 52
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "moveplatform1x1",
    "name": "移动平台1x1",
    "description": "moveplatform · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "moveplatform",
    "componentType": 5,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 2,
    "isVip": false,
    "available": true,
    "iconSource": "component",
    "iconFrame": "moveplatform1x1.png",
    "iconAsset": "/game/assets/pdzz/component-frames/moveplatform1x1.png",
    "iconCrop": {
      "x": 180,
      "y": 414,
      "width": 150,
      "height": 33
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "moveplatform2x1",
    "name": "移动平台2x1",
    "description": "moveplatform · 来自 APK 组件配置",
    "width": 2,
    "height": 1,
    "viewWidth": 2,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "moveplatform",
    "componentType": 5,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 2,
    "isVip": false,
    "available": true,
    "iconSource": "component",
    "iconFrame": "moveplatform2x1.png",
    "iconAsset": "/game/assets/pdzz/component-frames/moveplatform2x1.png",
    "iconCrop": {
      "x": 81,
      "y": 260,
      "width": 57,
      "height": 100
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "moveplatform3x1",
    "name": "移动平台3x1",
    "description": "moveplatform · 来自 APK 组件配置",
    "width": 3,
    "height": 1,
    "viewWidth": 3,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "moveplatform",
    "componentType": 5,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 2,
    "isVip": false,
    "available": true,
    "iconSource": "component",
    "iconFrame": "moveplatform3x1.png",
    "iconAsset": "/game/assets/pdzz/component-frames/moveplatform3x1.png",
    "iconCrop": {
      "x": 151,
      "y": 0,
      "width": 150,
      "height": 127
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "scaffold",
    "name": "红平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 5,
    "height": 1,
    "viewWidth": 5,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        4,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 8,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "scaffold.png",
    "iconAsset": "/game/assets/pdzz/component-frames/scaffold.png",
    "iconCrop": {
      "x": 136,
      "y": 617,
      "width": 250,
      "height": 68
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "redplatform",
    "name": "新红平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 5,
    "height": 1,
    "viewWidth": 5,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        4,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 8,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "redplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/redplatform.png",
    "iconCrop": {
      "x": 780,
      "y": 700,
      "width": 56,
      "height": 52
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "spinningplatform",
    "name": "黄平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 4,
    "height": 1,
    "viewWidth": 7,
    "viewHeight": 7,
    "cells": [
      [
        0,
        0
      ],
      [
        3,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 2,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 2,
    "isVip": true,
    "available": true,
    "iconSource": "component",
    "iconFrame": "spinningplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/spinningplatform.png",
    "iconCrop": {
      "x": 0,
      "y": 401,
      "width": 140,
      "height": 36
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "stomper",
    "name": "绿平台",
    "description": "stomper · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "stomper",
    "componentType": 27,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 11,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "stomper.png",
    "iconAsset": "/game/assets/pdzz/component-frames/stomper.png",
    "iconCrop": {
      "x": 570,
      "y": 906,
      "width": 52,
      "height": 52
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "shrinkplatform",
    "name": "新蓝平台",
    "description": "moveplatform · 来自 APK 组件配置",
    "width": 1,
    "height": 3,
    "viewWidth": 1,
    "viewHeight": 3,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        0,
        2
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "moveplatform",
    "componentType": 5,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 5,
    "isVip": true,
    "available": true,
    "iconSource": "component",
    "iconFrame": "shrinkplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/shrinkplatform.png",
    "iconCrop": {
      "x": 200,
      "y": 223,
      "width": 50,
      "height": 140
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "swingplatform",
    "name": "咖啡平台",
    "description": "platform · 来自 APK 组件配置",
    "width": 1,
    "height": 4,
    "viewWidth": 7,
    "viewHeight": 7,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        3
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 6,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "swingplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/swingplatform.png",
    "iconCrop": {
      "x": 667,
      "y": 797,
      "width": 55,
      "height": 52
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "purpleplatform",
    "name": "紫平台",
    "description": "moveplatform · 来自 APK 组件配置",
    "width": 1,
    "height": 6,
    "viewWidth": 1,
    "viewHeight": 6,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        5
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "moveplatform",
    "componentType": 5,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 12,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "purpleplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/purpleplatform.png",
    "iconCrop": {
      "x": 570,
      "y": 852,
      "width": 52,
      "height": 53
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "squaredplatform",
    "name": "转箱",
    "description": "squaredplatform · 来自 APK 组件配置",
    "width": 2,
    "height": 2,
    "viewWidth": 2,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "squaredplatform",
    "componentType": 17,
    "defaultDir": 1,
    "rotateMode": 2,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 10,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "squaredplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/squaredplatform.png",
    "iconCrop": {
      "x": 754,
      "y": 0,
      "width": 103,
      "height": 103
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "spring",
    "name": "弹簧",
    "description": "spring · 来自 APK 组件配置",
    "width": 2,
    "height": 1,
    "viewWidth": 2,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "bounce",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "spring",
    "componentType": 10,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 2,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "spring.png",
    "iconAsset": "/game/assets/pdzz/component-frames/spring.png",
    "iconCrop": {
      "x": 516,
      "y": 739,
      "width": 35,
      "height": 40
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "circlespring",
    "name": "球形弹簧",
    "description": "spring · 来自 APK 组件配置",
    "width": 2,
    "height": 2,
    "viewWidth": 2,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "bounce",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "spring",
    "componentType": 10,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 9,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "circlespring.png",
    "iconAsset": "/game/assets/pdzz/component-frames/circlespring.png",
    "iconCrop": {
      "x": 136,
      "y": 909,
      "width": 101,
      "height": 101
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "onewayblock",
    "name": "单向墙",
    "description": "onewayblock · 来自 APK 组件配置",
    "width": 1,
    "height": 2,
    "viewWidth": 1,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "onewayblock",
    "componentType": 24,
    "defaultDir": 2,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 12,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "onewayblock.png",
    "iconAsset": "/game/assets/pdzz/component-frames/onewayblock.png",
    "iconCrop": {
      "x": 852,
      "y": 438,
      "width": 52,
      "height": 98
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "triggerinvisible",
    "name": "银平台",
    "description": "triggerinvisible · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "triggerinvisible",
    "componentType": 31,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 12,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "triggerinvisible.png",
    "iconAsset": "/game/assets/pdzz/component-frames/triggerinvisible.png",
    "iconCrop": {
      "x": 516,
      "y": 789,
      "width": 53,
      "height": 53
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "treadmill",
    "name": "传送带",
    "description": "platform · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 11,
    "isVip": false,
    "available": true,
    "iconSource": "component",
    "iconFrame": "treadmill.png",
    "iconAsset": "/game/assets/pdzz/component-frames/treadmill.png",
    "iconCrop": {
      "x": 433,
      "y": 471,
      "width": 50,
      "height": 46
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "trackplatform",
    "name": "追踪平台",
    "description": "shooty · 来自 APK 组件配置",
    "width": 1,
    "height": 2,
    "viewWidth": 1,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "shooty",
    "componentType": 13,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 8,
    "isVip": true,
    "available": true,
    "iconSource": "component",
    "iconFrame": "trackplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/trackplatform.png",
    "iconCrop": {
      "x": 331,
      "y": 377,
      "width": 50,
      "height": 94
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "doublelift",
    "name": "升降平台",
    "description": "doublelift · 来自 APK 组件配置",
    "width": 5,
    "height": 1,
    "viewWidth": 5,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        4,
        0
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "doublelift",
    "componentType": 33,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 8,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "doublelift.png",
    "iconAsset": "/game/assets/pdzz/component-frames/doublelift.png",
    "iconCrop": {
      "x": 896,
      "y": 659,
      "width": 54,
      "height": 52
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "ferriswheel",
    "name": "摩天轮",
    "description": "ferriswheel · 来自 APK 组件配置",
    "width": 6,
    "height": 5,
    "viewWidth": 6,
    "viewHeight": 5,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ],
      [
        4,
        0
      ],
      [
        5,
        0
      ],
      [
        0,
        4
      ],
      [
        1,
        4
      ],
      [
        4,
        4
      ],
      [
        5,
        4
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "ferriswheel",
    "componentType": 38,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 8,
    "isVip": true,
    "available": true,
    "iconSource": "component",
    "iconFrame": "ferriswheel.png",
    "iconAsset": "/game/assets/pdzz/component-frames/ferriswheel.png",
    "iconCrop": {
      "x": 428,
      "y": 202,
      "width": 100,
      "height": 73
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "crumblingblock",
    "name": "碎块",
    "description": "crumblingblock · 来自 APK 组件配置",
    "width": 3,
    "height": 2,
    "viewWidth": 3,
    "viewHeight": 2,
    "cells": [
      [
        1,
        0
      ],
      [
        2,
        0
      ],
      [
        0,
        1
      ],
      [
        1,
        1
      ]
    ],
    "glyph": "▰",
    "color": "#4e9ba2",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "platform",
    "sourceType": "crumblingblock",
    "componentType": 11,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 5,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "crumblingblock.png",
    "iconAsset": "/game/assets/pdzz/component-frames/crumblingblock.png",
    "iconCrop": {
      "x": 251,
      "y": 0,
      "width": 151,
      "height": 103
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "spike",
    "name": "地刺",
    "description": "hazard · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 4,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "spike.png",
    "iconAsset": "/game/assets/pdzz/component-frames/spike.png",
    "iconCrop": {
      "x": 727,
      "y": 529,
      "width": 62,
      "height": 51
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "spike3x1",
    "name": "地刺x3",
    "description": "bundle · 来自 APK 组件配置",
    "width": 3,
    "height": 1,
    "viewWidth": 3,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "bundle",
    "componentType": 1,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 10,
    "isVip": false,
    "available": true,
    "iconSource": "component",
    "iconFrame": "spike3x1.png",
    "iconAsset": "/game/assets/pdzz/component-frames/spike3x1.png",
    "iconCrop": {
      "x": 251,
      "y": 332,
      "width": 140,
      "height": 44
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "spikeblock",
    "name": "大地刺",
    "description": "hazard · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 9,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "spikeblock.png",
    "iconAsset": "/game/assets/pdzz/component-frames/spikeblock.png",
    "iconCrop": {
      "x": 415,
      "y": 124,
      "width": 65,
      "height": 60
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "spikeball",
    "name": "刺球",
    "description": "hazard · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 1,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "spikeball.png",
    "iconAsset": "/game/assets/pdzz/component-frames/spikeball.png",
    "iconCrop": {
      "x": 707,
      "y": 445,
      "width": 74,
      "height": 64
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "spinningsaw",
    "name": "转锯",
    "description": "platform · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 5,
    "viewHeight": 5,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "hybrid",
    "category": "hazard",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 4,
    "isVip": false,
    "available": true,
    "iconSource": "component",
    "iconFrame": "spinningsaw.png",
    "iconAsset": "/game/assets/pdzz/component-frames/spinningsaw.png",
    "iconCrop": {
      "x": 0,
      "y": 208,
      "width": 140,
      "height": 51
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "swingsaw",
    "name": "摆锯",
    "description": "platform · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 7,
    "viewHeight": 4,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "hybrid",
    "category": "hazard",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 2,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 12,
    "isVip": true,
    "available": true,
    "iconSource": "component",
    "iconFrame": "swingsaw.png",
    "iconAsset": "/game/assets/pdzz/component-frames/swingsaw.png",
    "iconCrop": {
      "x": 141,
      "y": 346,
      "width": 38,
      "height": 140
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "rotaryhazard",
    "name": "转刀",
    "description": "platform · 来自 APK 组件配置",
    "width": 2,
    "height": 2,
    "viewWidth": 2,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 2,
    "rotateMode": 2,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 11,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "rotaryhazard.png",
    "iconAsset": "/game/assets/pdzz/component-frames/rotaryhazard.png",
    "iconCrop": {
      "x": 676,
      "y": 911,
      "width": 103,
      "height": 25
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "triggerhazard",
    "name": "仙人掌",
    "description": "hazard · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 9,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "triggerhazard.png",
    "iconAsset": "/game/assets/pdzz/component-frames/triggerhazard.png",
    "iconCrop": {
      "x": 363,
      "y": 944,
      "width": 76,
      "height": 61
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "flamethrower",
    "name": "喷火",
    "description": "hazard · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 11,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "flamethrower.png",
    "iconAsset": "/game/assets/pdzz/component-frames/flamethrower.png",
    "iconCrop": {
      "x": 1028,
      "y": 945,
      "width": 42,
      "height": 36
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "linearsaw",
    "name": "水平锯",
    "description": "platform · 来自 APK 组件配置",
    "width": 5,
    "height": 1,
    "viewWidth": 5,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ],
      [
        3,
        0
      ],
      [
        4,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "hybrid",
    "category": "hazard",
    "sourceType": "platform",
    "componentType": 3,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 8,
    "isVip": false,
    "available": true,
    "iconSource": "component",
    "iconFrame": "linearsaw.png",
    "iconAsset": "/game/assets/pdzz/component-frames/linearsaw.png",
    "iconCrop": {
      "x": 0,
      "y": 150,
      "width": 140,
      "height": 57
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "platformsaw",
    "name": "圆锯平台",
    "description": "hazard · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 5,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "platformsaw.png",
    "iconAsset": "/game/assets/pdzz/component-frames/platformsaw.png",
    "iconCrop": {
      "x": 1057,
      "y": 687,
      "width": 55,
      "height": 49
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "crawlhazard",
    "name": "爬行伤害",
    "description": "hazard · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "crawlhazard.png",
    "iconAsset": "/game/assets/pdzz/component-frames/crawlhazard.png",
    "iconCrop": {
      "x": 1028,
      "y": 982,
      "width": 38,
      "height": 36
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "saw",
    "name": "锯",
    "description": "hazard · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 10,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "saw.png",
    "iconAsset": "/game/assets/pdzz/component-frames/saw.png",
    "iconCrop": {
      "x": 940,
      "y": 776,
      "width": 51,
      "height": 51
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "ice",
    "name": "冰",
    "description": "iceOrMud · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "ice",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "iceOrMud",
    "componentType": 12,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 7,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "ice.png",
    "iconAsset": "/game/assets/pdzz/component-frames/ice.png",
    "iconCrop": {
      "x": 491,
      "y": 1054,
      "width": 56,
      "height": 43
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "ice3x1",
    "name": "冰块x3",
    "description": "bundle · 来自 APK 组件配置",
    "width": 3,
    "height": 1,
    "viewWidth": 3,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "ice",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "bundle",
    "componentType": 1,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 7,
    "isVip": false,
    "available": true,
    "iconSource": "component",
    "iconFrame": "ice3x1.png",
    "iconAsset": "/game/assets/pdzz/component-frames/ice3x1.png",
    "iconCrop": {
      "x": 0,
      "y": 361,
      "width": 140,
      "height": 39
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "mud",
    "name": "泥巴",
    "description": "iceOrMud · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "slow",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "iceOrMud",
    "componentType": 12,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 8,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "mud.png",
    "iconAsset": "/game/assets/pdzz/component-frames/mud.png",
    "iconCrop": {
      "x": 760,
      "y": 331,
      "width": 56,
      "height": 46
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "gas",
    "name": "反向毒气",
    "description": "hazard · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "free",
    "effect": "reverse",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 13,
    "isVip": true,
    "available": true,
    "iconSource": "component",
    "iconFrame": "gas.png",
    "iconAsset": "/game/assets/pdzz/component-frames/gas.png",
    "iconCrop": {
      "x": 530,
      "y": 243,
      "width": 41,
      "height": 41
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 10
  },
  {
    "id": "fortunecat",
    "name": "招财猫",
    "description": "hazard · 来自 APK 组件配置",
    "width": 1,
    "height": 2,
    "viewWidth": 1,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "free",
    "effect": "kill",
    "collisionMode": "hybrid",
    "category": "hazard",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 7,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "fortunecat.png",
    "iconAsset": "/game/assets/pdzz/component-frames/fortunecat.png",
    "iconCrop": {
      "x": 843,
      "y": 203,
      "width": 68,
      "height": 91
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "triggerspikes",
    "name": "弹簧刺",
    "description": "hazard · 来自 APK 组件配置",
    "width": 4,
    "height": 1,
    "viewWidth": 4,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ],
      [
        2,
        0
      ],
      [
        3,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "free",
    "effect": "kill",
    "collisionMode": "hybrid",
    "category": "hazard",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 6,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "triggerspikes_top.png",
    "iconAsset": "/game/assets/pdzz/component-frames/triggerspikes.png",
    "iconCrop": {
      "x": 760,
      "y": 295,
      "width": 203,
      "height": 35
    },
    "iconConfidence": "alias",
    "maxCountInLevel": 0
  },
  {
    "id": "checkpoint",
    "name": "检查点",
    "description": "checkpoint · 来自 APK 组件配置",
    "width": 1,
    "height": 3,
    "viewWidth": 3,
    "viewHeight": 4,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        0,
        2
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "boost",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "checkpoint",
    "componentType": 20,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "checkpoint.png",
    "iconAsset": "/game/assets/pdzz/component-frames/checkpoint.png",
    "iconCrop": {
      "x": 306,
      "y": 359,
      "width": 37,
      "height": 67
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 3
  },
  {
    "id": "respawnpoint",
    "name": "重生点-多人",
    "description": "respawnpoint · 来自 APK 组件配置",
    "width": 1,
    "height": 3,
    "viewWidth": 1,
    "viewHeight": 3,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        0,
        2
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "boost",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "respawnpoint",
    "componentType": 32,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "respawnpoint.png",
    "iconAsset": "/game/assets/pdzz/component-frames/respawnpoint.png",
    "iconCrop": {
      "x": 354,
      "y": 686,
      "width": 27,
      "height": 42
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 30
  },
  {
    "id": "rotatehinge",
    "name": "旋转路径",
    "description": "path · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "none",
    "category": "special",
    "sourceType": "path",
    "componentType": 37,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "rotatehinge.png",
    "iconAsset": "/game/assets/pdzz/component-frames/rotatehinge.png",
    "iconCrop": {
      "x": 644,
      "y": 1058,
      "width": 25,
      "height": 25
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "custompathnode",
    "name": "路径",
    "description": "path · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "none",
    "category": "special",
    "sourceType": "path",
    "componentType": 37,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "custompathnode.png",
    "iconAsset": "/game/assets/pdzz/component-frames/custompathnode.png",
    "iconCrop": {
      "x": 834,
      "y": 511,
      "width": 16,
      "height": 15
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "pathconnector",
    "name": "路径连接器",
    "description": "special · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "none",
    "category": "special",
    "sourceType": "none",
    "componentType": 80,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "pathconnector.png",
    "iconAsset": "/game/assets/pdzz/component-frames/pathconnector.png",
    "iconCrop": {
      "x": 212,
      "y": 1066,
      "width": 25,
      "height": 25
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "landmine",
    "name": "炸药包",
    "description": "landmine · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "landmine",
    "componentType": 21,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 4,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "landmine.png",
    "iconAsset": "/game/assets/pdzz/component-frames/landmine.png",
    "iconCrop": {
      "x": 552,
      "y": 682,
      "width": 55,
      "height": 55
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "landminesmall",
    "name": "小炸药包",
    "description": "landmine · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "landmine",
    "componentType": 21,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "landminesmall.png",
    "iconAsset": "/game/assets/pdzz/component-frames/landminesmall.png",
    "iconCrop": {
      "x": 1075,
      "y": 323,
      "width": 40,
      "height": 40
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "minirobot",
    "name": "小机器人",
    "description": "npc · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "none",
    "category": "special",
    "sourceType": "npc",
    "componentType": 40,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "minirobot.png",
    "iconAsset": "/game/assets/pdzz/component-frames/minirobot.png",
    "iconCrop": {
      "x": 1020,
      "y": 514,
      "width": 55,
      "height": 66
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 1
  },
  {
    "id": "airjump",
    "name": "二段跳",
    "description": "airjump · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "boost",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "airjump",
    "componentType": 23,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 12,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "airjump.png",
    "iconAsset": "/game/assets/pdzz/component-frames/airjump.png",
    "iconCrop": {
      "x": 778,
      "y": 965,
      "width": 50,
      "height": 49
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "triggerspring",
    "name": "蘑菇弹簧",
    "description": "spring · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "supported",
    "effect": "bounce",
    "collisionMode": "none",
    "category": "special",
    "sourceType": "spring",
    "componentType": 10,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 5,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "triggerspring.png",
    "iconAsset": "/game/assets/pdzz/component-frames/triggerspring.png",
    "iconCrop": {
      "x": 897,
      "y": 606,
      "width": 58,
      "height": 52
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "fan",
    "name": "风扇",
    "description": "spring · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "supported",
    "effect": "wind",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "spring",
    "componentType": 10,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 9,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "fan.png",
    "iconAsset": "/game/assets/pdzz/component-frames/fan.png",
    "iconCrop": {
      "x": 1096,
      "y": 841,
      "width": 24,
      "height": 24
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "onedirblock",
    "name": "移动方块",
    "description": "onedirblock · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "special",
    "sourceType": "onedirblock",
    "componentType": 28,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 12,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "onedirblock.png",
    "iconAsset": "/game/assets/pdzz/component-frames/onedirblock.png",
    "iconCrop": {
      "x": 680,
      "y": 858,
      "width": 52,
      "height": 52
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "altplatform",
    "name": "变换平台",
    "description": "alt · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "none",
    "category": "special",
    "sourceType": "alt",
    "componentType": 30,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 12,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "altplatform.png",
    "iconAsset": "/game/assets/pdzz/component-frames/altplatform.png",
    "iconCrop": {
      "x": 887,
      "y": 765,
      "width": 52,
      "height": 52
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "altspike",
    "name": "变换刺球",
    "description": "alt · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "kill",
    "collisionMode": "none",
    "category": "special",
    "sourceType": "alt",
    "componentType": 30,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 12,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "altspike.png",
    "iconAsset": "/game/assets/pdzz/component-frames/altspike.png",
    "iconCrop": {
      "x": 891,
      "y": 880,
      "width": 51,
      "height": 49
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "jellyfish",
    "name": "水母",
    "description": "jellyfish · 来自 APK 组件配置",
    "width": 2,
    "height": 1,
    "viewWidth": 2,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "jellyfish",
    "componentType": 35,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 9,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "jellyfish.png",
    "iconAsset": "/game/assets/pdzz/component-frames/jellyfish.png",
    "iconCrop": {
      "x": 736,
      "y": 210,
      "width": 106,
      "height": 84
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "shootbarrel",
    "name": "barrel",
    "description": "shootbarrel · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "kill",
    "collisionMode": "none",
    "category": "special",
    "sourceType": "shootbarrel",
    "componentType": 39,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 7,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "shootbarrel.png",
    "iconAsset": "/game/assets/pdzz/component-frames/shootbarrel.png",
    "iconCrop": {
      "x": 497,
      "y": 617,
      "width": 54,
      "height": 62
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "boxingglove",
    "name": "拳击手套",
    "description": "hazard · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "hazard",
    "componentType": 6,
    "defaultDir": 2,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 3,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "boxingglove.png",
    "iconAsset": "/game/assets/pdzz/component-frames/boxingglove.png",
    "iconCrop": {
      "x": 839,
      "y": 651,
      "width": 56,
      "height": 52
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "crossbow",
    "name": "连弩",
    "description": "shooty · 来自 APK 组件配置",
    "width": 2,
    "height": 1,
    "viewWidth": 2,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ],
      [
        1,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "hybrid",
    "category": "hazard",
    "sourceType": "shooty",
    "componentType": 13,
    "defaultDir": 4,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 8,
    "isVip": true,
    "available": true,
    "iconSource": "component",
    "iconFrame": "crossbow.png",
    "iconAsset": "/game/assets/pdzz/component-frames/crossbow.png",
    "iconCrop": {
      "x": 151,
      "y": 128,
      "width": 103,
      "height": 94
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "cannon",
    "name": "加农炮",
    "description": "shooty · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "shooty",
    "componentType": 13,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 12,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "cannon.png",
    "iconAsset": "/game/assets/pdzz/component-frames/cannon.png",
    "iconCrop": {
      "x": 920,
      "y": 331,
      "width": 43,
      "height": 27
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 30
  },
  {
    "id": "lasershooter",
    "name": "激光炮",
    "description": "shooty · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "!",
    "color": "#e35d58",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "hazard",
    "sourceType": "shooty",
    "componentType": 13,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 13,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "lasershooter.png",
    "iconAsset": "/game/assets/pdzz/component-frames/lasershooter.png",
    "iconCrop": {
      "x": 1075,
      "y": 404,
      "width": 38,
      "height": 25
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 30
  },
  {
    "id": "ballooncannon",
    "name": "气球炮",
    "description": "shooty · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "supported",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "shooty",
    "componentType": 13,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 12,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "ballooncannon.png",
    "iconAsset": "/game/assets/pdzz/component-frames/ballooncannon.png",
    "iconCrop": {
      "x": 729,
      "y": 1079,
      "width": 42,
      "height": 25
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 30
  },
  {
    "id": "score",
    "name": "星星",
    "description": "scoreItem · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "scoreItem",
    "componentType": 8,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 4,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "score.png",
    "iconAsset": "/game/assets/pdzz/component-frames/score.png",
    "iconCrop": {
      "x": 517,
      "y": 843,
      "width": 52,
      "height": 53
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 3
  },
  {
    "id": "gem",
    "name": "宝石",
    "description": "gem · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "gem",
    "componentType": 41,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 4,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "gem.png",
    "iconAsset": "/game/assets/pdzz/component-frames/gem.png",
    "iconCrop": {
      "x": 361,
      "y": 323,
      "width": 36,
      "height": 35
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "treasurechest",
    "name": "宝箱",
    "description": "treasurechest · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "none",
    "category": "special",
    "sourceType": "treasurechest",
    "componentType": 18,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 3,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "treasurechest.png",
    "iconAsset": "/game/assets/pdzz/component-frames/treasurechest.png",
    "iconCrop": {
      "x": 723,
      "y": 805,
      "width": 54,
      "height": 52
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "bombsmall",
    "name": "小炸弹",
    "description": "bomb · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "bomb",
    "componentType": 7,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 3,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "bombsmall.png",
    "iconAsset": "/game/assets/pdzz/component-frames/bombsmall.png",
    "iconCrop": {
      "x": 623,
      "y": 956,
      "width": 50,
      "height": 50
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "bomb",
    "name": "大炸弹",
    "description": "bomb · 来自 APK 组件配置",
    "width": 2,
    "height": 2,
    "viewWidth": 2,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "kill",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "bomb",
    "componentType": 7,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 4,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "bomb.png",
    "iconAsset": "/game/assets/pdzz/component-frames/bomb.png",
    "iconCrop": {
      "x": 805,
      "y": 104,
      "width": 88,
      "height": 98
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "portal",
    "name": "传送门",
    "description": "portal · 来自 APK 组件配置",
    "width": 2,
    "height": 2,
    "viewWidth": 2,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "teleport",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "portal",
    "componentType": 22,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "portal.png",
    "iconAsset": "/game/assets/pdzz/component-frames/portal.png",
    "iconCrop": {
      "x": 136,
      "y": 807,
      "width": 103,
      "height": 101
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "superblock",
    "name": "超级方块",
    "description": "superblock · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "special",
    "sourceType": "superblock",
    "componentType": 29,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "component",
    "iconFrame": "superblock.png",
    "iconAsset": "/game/assets/pdzz/component-frames/superblock.png",
    "iconCrop": {
      "x": 382,
      "y": 471,
      "width": 50,
      "height": 49
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "counterdoor",
    "name": "物品门",
    "description": "door · 来自 APK 组件配置",
    "width": 1,
    "height": 2,
    "viewWidth": 1,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "special",
    "sourceType": "door",
    "componentType": 26,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "counterdoordown.png",
    "iconAsset": "/game/assets/pdzz/component-frames/counterdoor.png",
    "iconCrop": {
      "x": 967,
      "y": 156,
      "width": 49,
      "height": 55
    },
    "iconConfidence": "alias",
    "maxCountInLevel": 10
  },
  {
    "id": "onoffswitch",
    "name": "开关",
    "description": "onoffswitch · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "reverse",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "onoffswitch",
    "componentType": 25,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "onoffswitchbase.png",
    "iconAsset": "/game/assets/pdzz/component-frames/onoffswitch.png",
    "iconCrop": {
      "x": 877,
      "y": 1022,
      "width": 55,
      "height": 21
    },
    "iconConfidence": "alias",
    "maxCountInLevel": 5
  },
  {
    "id": "pressureswitch",
    "name": "压力开关",
    "description": "pressureswitch · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "reverse",
    "collisionMode": "trigger",
    "category": "special",
    "sourceType": "pressureswitch",
    "componentType": 36,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "pressureswitchbutton.png",
    "iconAsset": "/game/assets/pdzz/component-frames/pressureswitch.png",
    "iconCrop": {
      "x": 829,
      "y": 971,
      "width": 53,
      "height": 40
    },
    "iconConfidence": "alias",
    "maxCountInLevel": 5
  },
  {
    "id": "door",
    "name": "门",
    "description": "door · 来自 APK 组件配置",
    "width": 1,
    "height": 2,
    "viewWidth": 1,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "special",
    "sourceType": "door",
    "componentType": 26,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "door.png",
    "iconAsset": "/game/assets/pdzz/component-frames/door.png",
    "iconCrop": {
      "x": 912,
      "y": 156,
      "width": 54,
      "height": 106
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "rotarydoor",
    "name": "旋转门",
    "description": "door · 来自 APK 组件配置",
    "width": 2,
    "height": 2,
    "viewWidth": 2,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        1,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "special",
    "sourceType": "door",
    "componentType": 26,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": false,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "rotarydoor.png",
    "iconAsset": "/game/assets/pdzz/component-frames/rotarydoor.png",
    "iconCrop": {
      "x": 240,
      "y": 807,
      "width": 103,
      "height": 101
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "movabledoor",
    "name": "移动门",
    "description": "door · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "solid",
    "category": "special",
    "sourceType": "door",
    "componentType": 26,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "door.png",
    "iconAsset": "/game/assets/pdzz/component-frames/movabledoor.png",
    "iconCrop": {
      "x": 912,
      "y": 156,
      "width": 54,
      "height": 106
    },
    "iconConfidence": "alias",
    "maxCountInLevel": 0
  },
  {
    "id": "movablesaw",
    "name": "移动锯",
    "description": "door · 来自 APK 组件配置",
    "width": 2,
    "height": 2,
    "viewWidth": 2,
    "viewHeight": 2,
    "cells": [
      [
        0,
        0
      ],
      [
        0,
        1
      ],
      [
        1,
        0
      ],
      [
        1,
        1
      ]
    ],
    "glyph": "◆",
    "color": "#d5953d",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "none",
    "category": "special",
    "sourceType": "door",
    "componentType": 26,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "rotaryhazard.png",
    "iconAsset": "/game/assets/pdzz/component-frames/movablesaw.png",
    "iconCrop": {
      "x": 676,
      "y": 911,
      "width": 103,
      "height": 25
    },
    "iconConfidence": "alias",
    "maxCountInLevel": 0
  },
  {
    "id": "arrowstraight",
    "name": "箭头",
    "description": "deco · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#7f8fa6",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "none",
    "category": "decoration",
    "sourceType": "deco",
    "componentType": 9,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "arrowstraight.png",
    "iconAsset": "/game/assets/pdzz/component-frames/arrowstraight.png",
    "iconCrop": {
      "x": 1076,
      "y": 514,
      "width": 42,
      "height": 52
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 30
  },
  {
    "id": "arrowdiagonal",
    "name": "斜向箭头",
    "description": "deco · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#7f8fa6",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "none",
    "category": "decoration",
    "sourceType": "deco",
    "componentType": 9,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "arrowdiagonal.png",
    "iconAsset": "/game/assets/pdzz/component-frames/arrowdiagonal.png",
    "iconCrop": {
      "x": 974,
      "y": 363,
      "width": 40,
      "height": 42
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 30
  },
  {
    "id": "note",
    "name": "音符",
    "description": "deco · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#7f8fa6",
    "placement": "free",
    "effect": "wall",
    "collisionMode": "none",
    "category": "decoration",
    "sourceType": "deco",
    "componentType": 9,
    "defaultDir": 1,
    "rotateMode": 0,
    "snapToGround": false,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": false,
    "available": true,
    "iconSource": "game",
    "iconFrame": "note.png",
    "iconAsset": "/game/assets/pdzz/component-frames/note.png",
    "iconCrop": {
      "x": 167,
      "y": 1066,
      "width": 44,
      "height": 37
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "text",
    "name": "告示板",
    "description": "deco · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#7f8fa6",
    "placement": "supported",
    "effect": "wall",
    "collisionMode": "none",
    "category": "decoration",
    "sourceType": "deco",
    "componentType": 9,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "text.png",
    "iconAsset": "/game/assets/pdzz/component-frames/text.png",
    "iconCrop": {
      "x": 556,
      "y": 560,
      "width": 54,
      "height": 64
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "decal",
    "name": "贴花",
    "description": "deco · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#7f8fa6",
    "placement": "supported",
    "effect": "wall",
    "collisionMode": "none",
    "category": "decoration",
    "sourceType": "deco",
    "componentType": 9,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": false,
    "iconSource": "game",
    "iconFrame": "decal.png",
    "iconAsset": "/game/assets/pdzz/component-frames/decal.png",
    "iconCrop": {
      "x": 556,
      "y": 499,
      "width": 60,
      "height": 60
    },
    "iconConfidence": "exact",
    "maxCountInLevel": 0
  },
  {
    "id": "action",
    "name": "Action",
    "description": "deco · 来自 APK 组件配置",
    "width": 1,
    "height": 1,
    "viewWidth": 1,
    "viewHeight": 1,
    "cells": [
      [
        0,
        0
      ]
    ],
    "glyph": "◆",
    "color": "#7f8fa6",
    "placement": "supported",
    "effect": "wall",
    "collisionMode": "none",
    "category": "decoration",
    "sourceType": "deco",
    "componentType": 9,
    "defaultDir": 1,
    "rotateMode": 1,
    "snapToGround": true,
    "fullrect": true,
    "danToUnlock": 30,
    "isVip": true,
    "available": true,
    "iconSource": "game",
    "iconFrame": "arrowstraight.png",
    "iconAsset": "/game/assets/pdzz/component-frames/action.png",
    "iconCrop": {
      "x": 1076,
      "y": 514,
      "width": 42,
      "height": 52
    },
    "iconConfidence": "alias",
    "maxCountInLevel": 0
  }
]
export const PDZZ_CHARACTERS: PdzzCharacterDefinition[] = [
  {
    "id": "0001",
    "refID": "rabbit",
    "name": "棒尼",
    "description": "胡萝卜最好吃了！",
    "avatarID": "rabbit2",
    "imageAsset": "/game/assets/pdzz/characters/frames/rabbit2.png",
    "available": true
  },
  {
    "id": "0002",
    "refID": "pig",
    "name": "平克",
    "description": "嘿，兄弟！我们好久不见你在哪里",
    "avatarID": "pig",
    "imageAsset": "/game/assets/pdzz/characters/frames/pig.png",
    "available": true
  },
  {
    "id": "0003",
    "refID": "dinosaur",
    "name": "迪诺",
    "description": "不可以天天玩游戏！",
    "avatarID": "dinosaur2",
    "imageAsset": "/game/assets/pdzz/characters/frames/dinosaur2.png",
    "available": true
  },
  {
    "id": "0004",
    "refID": "tiger",
    "name": "泰哥",
    "description": "健身的第三天！",
    "avatarID": "tiger",
    "imageAsset": "/game/assets/pdzz/characters/frames/tiger.png",
    "available": true
  },
  {
    "id": "0005",
    "refID": "horse",
    "name": "豪斯",
    "description": "好久没吃新鲜的草了",
    "avatarID": "horse",
    "imageAsset": "/game/assets/pdzz/characters/frames/horse.png",
    "available": true
  },
  {
    "id": "0006",
    "refID": "chicken",
    "name": "奇克",
    "description": "啥玩意儿啊，看不懂呢",
    "avatarID": "chicken",
    "imageAsset": "/game/assets/pdzz/characters/frames/chicken.png",
    "available": true
  },
  {
    "id": "0007",
    "refID": "dog",
    "name": "俊仔",
    "description": "猫才需要恋爱",
    "avatarID": "dog",
    "imageAsset": "/game/assets/pdzz/characters/frames/dog.png",
    "available": true
  },
  {
    "id": "0008",
    "refID": "sheep",
    "name": "尚恩",
    "description": "咩咩…咩咩咩……",
    "avatarID": "sheep",
    "imageAsset": "/game/assets/pdzz/characters/frames/sheep.png",
    "available": true
  },
  {
    "id": "0009",
    "refID": "bull",
    "name": "布尔",
    "description": "你看！我的角好帅哦",
    "avatarID": "bull",
    "imageAsset": "/game/assets/pdzz/characters/frames/bull.png",
    "available": true
  },
  {
    "id": "0010",
    "refID": "monkey",
    "name": "小孙",
    "description": "我是你的救兵哟",
    "avatarID": "monkey",
    "imageAsset": "/game/assets/pdzz/characters/frames/monkey.png",
    "available": true
  },
  {
    "id": "0011",
    "refID": "snake",
    "name": "斯斯",
    "description": "舍我其谁？",
    "avatarID": "snake",
    "imageAsset": "/game/assets/pdzz/characters/frames/snake.png",
    "available": true
  },
  {
    "id": "0012",
    "refID": "mouse",
    "name": "慕斯",
    "description": "会二攀上墙吗？请你吃糖",
    "avatarID": "mouse",
    "imageAsset": "/game/assets/pdzz/characters/frames/mouse.png",
    "available": true
  },
  {
    "id": "0013",
    "refID": "bear",
    "name": "贝尔",
    "description": "一起去冒险吖",
    "avatarID": "bear",
    "imageAsset": "/game/assets/pdzz/characters/frames/bear.png",
    "available": true
  },
  {
    "id": "0014",
    "refID": "shark",
    "name": "鲨鲨",
    "description": "(⊙_⊙)?",
    "avatarID": "shark",
    "imageAsset": "/game/assets/pdzz/characters/frames/shark.png",
    "available": true
  },
  {
    "id": "0015",
    "refID": "honeybadger",
    "name": "蜜獾",
    "description": "THIS IS HB!",
    "avatarID": "honeybadger",
    "imageAsset": "/game/assets/pdzz/characters/frames/honeybadger.png",
    "available": false
  }
]
export const PDZZ_MAP_CATALOG = PDZZ_MAPS.filter((map) => map.id.startsWith('level') && map.id !== 'levelhome').map(({ elements, ...map }) => map)
export const PDZZ_LEAGUE_MAP_CATALOG = PDZZ_MAP_CATALOG.filter((map) => map.available && map.supportAIBattle)
export const PDZZ_LEAGUE_MAP_IDS = PDZZ_LEAGUE_MAP_CATALOG.map((map) => map.id)
export const PDZZ_PLAYABLE_MAP_IDS = PDZZ_LEAGUE_MAP_IDS
export function getPdzzMap(mapId: string | null | undefined) { return PDZZ_MAPS.find((map) => map.id === mapId) ?? PDZZ_MAPS.find((map) => map.id === 'levelfarm') ?? PDZZ_MAPS[0] }
export function getPdzzCharacterForSlot(slot: number) { return PDZZ_CHARACTERS[(Math.max(1, slot) - 1) % PDZZ_CHARACTERS.length] ?? PDZZ_CHARACTERS[0] }
