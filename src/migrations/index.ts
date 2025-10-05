import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251004_134335 from './20251004_134335';
import * as migration_20251004_144351 from './20251004_144351';
import * as migration_20251005_091906 from './20251005_091906';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251004_134335.up,
    down: migration_20251004_134335.down,
    name: '20251004_134335',
  },
  {
    up: migration_20251004_144351.up,
    down: migration_20251004_144351.down,
    name: '20251004_144351',
  },
  {
    up: migration_20251005_091906.up,
    down: migration_20251005_091906.down,
    name: '20251005_091906'
  },
];
