import * as migration_20260118_create_initial_schema from './20260118_create_initial_schema'

export const migrations: any[] = [
  {
    up: migration_20260118_create_initial_schema.up,
    down: migration_20260118_create_initial_schema.down,
    name: '20260118_create_initial_schema',
  },
]
