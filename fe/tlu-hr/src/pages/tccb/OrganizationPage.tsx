import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown, Building2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import organizationData from "@/data/organizations.json";
import personnelData from "@/data/personnel.json";

interface OrgNodeProps {
  unitId: string;
  level: number;
  expandedUnits: Set<string>;
  onToggle: (unitId: string) => void;
}

function OrgNode({ unitId, level, expandedUnits, onToggle }: OrgNodeProps) {
  const navigate = useNavigate();
  const unit = organizationData.find((u) => u.id === unitId);
  
  if (!unit) return null;

  const isExpanded = expandedUnits.has(unitId);
  const hasChildren = unit.children && unit.children.length > 0;
  const memberCount = personnelData.filter(
    (p) => p.currentUnit?.unitId === unitId
  ).length;

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer hover:bg-muted transition-colors",
          level === 0 && "font-semibold"
        )}
        style={{ paddingLeft: `${level * 24 + 12}px` }}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(unitId);
            }}
            className="p-1 hover:bg-muted-foreground/10 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <span className="w-6" />
        )}
        
        <div
          className="flex items-center gap-2 flex-1"
          onClick={() => navigate(`/tccb/organization/${unitId}`)}
        >
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="flex-1">{unit.name}</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>{memberCount}</span>
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {unit.children.map((childId) => (
            <OrgNode
              key={childId}
              unitId={childId}
              level={level + 1}
              expandedUnits={expandedUnits}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrganizationPage() {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(
    new Set(["unit-001"])
  );

  const toggleUnit = (unitId: string) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId);
    } else {
      newExpanded.add(unitId);
    }
    setExpandedUnits(newExpanded);
  };

  const rootUnit = organizationData.find((u) => u.parentId === null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sơ đồ tổ chức</h1>
        <p className="text-muted-foreground">
          Cơ cấu tổ chức của Trường Đại học Thủy lợi
        </p>
      </div>

      <div className="rounded-lg border bg-card">
        {rootUnit ? (
          <OrgNode
            unitId={rootUnit.id}
            level={0}
            expandedUnits={expandedUnits}
            onToggle={toggleUnit}
          />
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            Không tìm thấy dữ liệu tổ chức
          </div>
        )}
      </div>
    </div>
  );
}
