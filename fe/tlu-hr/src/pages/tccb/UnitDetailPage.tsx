import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Building2, Users, MapPin, Phone, Mail, Globe } from "lucide-react";
import organizationData from "@/data/organizations.json";
import personnelData from "@/data/personnel.json";

export default function UnitDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const unit = organizationData.find((u) => u.id === id);
  
  if (!unit) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Không tìm thấy đơn vị</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/tccb/organization")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
      </div>
    );
  }

  const getTypeBadge = (type: string) => {
    const types: Record<string, string> = {
      university: "Trường",
      faculty: "Khoa",
      department: "Bộ môn",
      office: "Phòng",
      board: "Ban",
    };
    return <Badge variant="outline">{types[type] || type}</Badge>;
  };

  const getParentName = (parentId: string | null) => {
    if (!parentId) return null;
    const parent = organizationData.find((u) => u.id === parentId);
    return parent?.name;
  };

  const unitMembers = personnelData.filter(
    (p) => p.currentUnit?.unitId === id
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/tccb/organization")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{unit.name}</h1>
            {getTypeBadge(unit.type)}
          </div>
          <p className="text-muted-foreground">{unit.code}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Thông tin chung
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {unit.parentId && (
              <div className="flex items-start gap-2">
                <span className="text-muted-foreground min-w-[100px]">Trực thuộc:</span>
                <span>{getParentName(unit.parentId)}</span>
              </div>
            )}
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <span>{unit.officeAddress}</span>
            </div>
            {unit.phone && (
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>{unit.phone}</span>
              </div>
            )}
            {unit.email && (
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>{unit.email}</span>
              </div>
            )}
            {unit.website && (
              <div className="flex items-start gap-2">
                <Globe className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <a href={unit.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {unit.website}
                </a>
              </div>
            )}
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground min-w-[100px]">Ngày thành lập:</span>
              <span>{unit.establishmentDate}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Nhân sự ({unitMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {unitMembers.length > 0 ? (
              <div className="space-y-2">
                {unitMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                    onClick={() => navigate(`/tccb/personnel/${member.id}`)}
                  >
                    <div>
                      <div className="font-medium">{member.fullName}</div>
                      <div className="text-sm text-muted-foreground">{member.currentUnit?.positionName}</div>
                    </div>
                    <Badge variant={member.status === "active" ? "default" : "secondary"}>
                      {member.status === "active" ? "Đang công tác" : "Không hoạt động"}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Chưa có nhân sự</p>
            )}
          </CardContent>
        </Card>
      </div>

      {unit.children && unit.children.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Đơn vị trực thuộc</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {unit.children.map((childId) => {
                const child = organizationData.find((u) => u.id === childId);
                if (!child) return null;
                return (
                  <div
                    key={childId}
                    className="p-4 border rounded-lg hover:bg-muted cursor-pointer"
                    onClick={() => navigate(`/tccb/organization/${childId}`)}
                  >
                    <div className="font-medium">{child.name}</div>
                    <div className="text-sm text-muted-foreground">{child.code}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
