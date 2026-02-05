# Learnings

## 2026-02-05T03:37 Session Start
- Plan: phase5-user-personnel-linking
- Goal: Link users to personnel records and integrate training config

## 2026-02-05 Users ↔ Personnel Linking
- Updated `src/data/users.json` to include `personnelId` (null for admin) and link `user-002..004` to `pers-001..003`.

## 2026-02-05T10:50 Session Complete
- All 7 tasks completed successfully
- Wave 1: users.json updated with 4 users and personnelId links
- Wave 2: All 5 UI pages updated in parallel (UserCreate, UserEdit, UserList, TrainingCreate, TrainingEdit)
- Wave 3: Build verified and commit created (b2ad70c)

### Patterns Used
- Personnel selector filtering: useMemo with Set to track linked personnel IDs
- Config-driven dropdowns: Import JSON, filter isActive, sort by order
- TypeScript casting: `(data as unknown as Type[])` for JSON imports

### Technical Notes
- User interface already had `personnelId?: string` in types
- No typecheck script in package.json, used `bun run build` which includes tsc -b
