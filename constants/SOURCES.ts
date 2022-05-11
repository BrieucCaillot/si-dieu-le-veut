import { ORDALIES } from './ORDALIES'

enum SourceType {
	texture = 'texture',
	cubeTexture = 'cubeTexture',
	gltfModel = 'gltfModel',
}

interface Source {
	name: string
	type: SourceType
	path: string | string[]
}

const commonSources = [
	{
		name: 'environmentMapTexture',
		type: SourceType.cubeTexture,
		path: [
			'textures/environmentMap/px.jpg',
			'textures/environmentMap/nx.jpg',
			'textures/environmentMap/py.jpg',
			'textures/environmentMap/ny.jpg',
			'textures/environmentMap/pz.jpg',
			'textures/environmentMap/nz.jpg',
		],
	},
	{
		name: 'grassColorTexture',
		type: SourceType.texture,
		path: 'textures/dirt/color.jpg',
	},
	{
		name: 'grassNormalTexture',
		type: SourceType.texture,
		path: 'textures/dirt/normal.jpg',
	},
	{
		name: 'foxModel',
		type: SourceType.gltfModel,
		path: 'models/Fox/glTF/Fox.gltf',
	},
	{
		name: 'characterModel',
		type: SourceType.gltfModel,
		path: 'models/Character/test_rig.glb',
	},
]

const ORDALIE_SOURCES = {
	[ORDALIES.ORDALIES_1]: [
		{
			name: 'tapisserieBase',
			type: SourceType.texture,
			path: 'textures/tapisserie/test.png',
		},
		{
			name: 'billboardNormal',
			type: SourceType.texture,
			path: 'textures/Billboard/billboard-normal.jpeg',
		},
	],
	[ORDALIES.ORDALIES_2]: [
		// {
		// 	name: 'tapisserieBase',
		// 	type: SourceType.texture,
		// 	path: 'textures/tapisserie/test.png',
		// },
		// {
		// 	name: 'billboardNormal',
		// 	type: SourceType.texture,
		// 	path: 'textures/Billboard/billboard-normal.jpeg',
		// },
	],
}

export { SourceType, Source, commonSources, ORDALIE_SOURCES }
