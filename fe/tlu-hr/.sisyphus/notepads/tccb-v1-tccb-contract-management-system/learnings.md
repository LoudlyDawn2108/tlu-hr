
## Implementation of Contracts Tab
- **Pattern**: Used `TabsContent` to encapsulate the contracts list within the Personnel Detail page.
- **Data Fetching**: Mocked by filtering `contracts.json` using `personnelId`.
- **UI Components**: Used `Card`, `Badge` (with custom colors for contract statuses), and `Button` from shadcn/ui.
- **Helper Functions**: Created local helper functions `getContractTypeLabel` and `getContractStatusBadge` to keep the JSX clean.
- **Navigation**: "Thêm hợp đồng" button uses `navigate` to `/tccb/contracts/new` with `personnelId` query param.
