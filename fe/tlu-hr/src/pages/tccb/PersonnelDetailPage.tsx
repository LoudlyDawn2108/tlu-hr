import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Building2, GraduationCap, FileText, Wallet, Award, BookOpen, Users, Pencil, UserX, History, Plus, FileSignature, Ban } from "lucide-react";
import personnelData from "@/data/personnel.json";
import organizationData from "@/data/organizations.json";
import contractsData from "@/data/contracts.json";

export default function PersonnelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const person = personnelData.find((p) => p.id === id);
  const contracts = contractsData.filter((c) => c.personnelId === id).sort((a, b) => new Date(b.signDate).getTime() - new Date(a.signDate).getTime());
  
  const [isTerminateDialogOpen, setIsTerminateDialogOpen] = useState(false);
  const [terminationDate, setTerminationDate] = useState("");
  const [terminationReason, setTerminationReason] = useState("");
  const [personStatus, setPersonStatus] = useState(person?.status || "active");

  const handleTerminate = () => {
    if (!terminationDate) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn ngày thôi việc",
      });
      return;
    }

    setPersonStatus("inactive");
    
    toast({
      title: "Thành công",
      description: `Đã đánh dấu thôi việc ngày ${terminationDate}`,
    });
    
    setIsTerminateDialogOpen(false);
    setTerminationDate("");
    setTerminationReason("");
  };
  
  if (!person) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Không tìm thấy nhân sự</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/tccb/personnel")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
      </div>
    );
  }

  const getUnitName = (unitId: string | undefined) => {
    if (!unitId) return "-";
    const unit = organizationData.find((u) => u.id === unitId);
    return unit?.name || "-";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Đang hoạt động</Badge>;
      case "inactive":
        return <Badge variant="secondary">Không hoạt động</Badge>;
      case "retired":
        return <Badge variant="outline">Đã nghỉ hưu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case "indefinite":
        return "Không xác định thời hạn";
      case "definite":
        return "Xác định thời hạn";
      case "probation":
        return "Thử việc";
      case "visiting":
        return "Thỉnh giảng";
      default:
        return type;
    }
  };

  const getContractStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Đang hiệu lực</Badge>;
      case "expired":
        return <Badge variant="secondary">Đã hết hạn</Badge>;
      case "extended":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Đã gia hạn</Badge>;
      case "terminated":
        return <Badge variant="destructive">Đã chấm dứt</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/tccb/personnel")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{person.fullName}</h1>
          <p className="text-muted-foreground">{person.employeeCode} • {getUnitName(person.currentUnit?.unitId)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/tccb/personnel/${id}/edit`)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Sửa
          </Button>
          {personStatus !== "inactive" && personStatus !== "retired" && (
            <Button
              variant="destructive"
              onClick={() => setIsTerminateDialogOpen(true)}
            >
              <UserX className="mr-2 h-4 w-4" />
              Đánh dấu thôi việc
            </Button>
          )}
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-lg">{person.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          {getStatusBadge(personStatus)}
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="personal">
            <Building2 className="mr-2 h-4 w-4" />
            Cá nhân
          </TabsTrigger>
          <TabsTrigger value="education">
            <GraduationCap className="mr-2 h-4 w-4" />
            Học vấn
          </TabsTrigger>
          <TabsTrigger value="contracts">
            <FileText className="mr-2 h-4 w-4" />
            Hợp đồng
          </TabsTrigger>
          <TabsTrigger value="salary">
            <Wallet className="mr-2 h-4 w-4" />
            Lương
          </TabsTrigger>
          <TabsTrigger value="rewards">
            <Award className="mr-2 h-4 w-4" />
            Khen thưởng
          </TabsTrigger>
          <TabsTrigger value="training">
            <BookOpen className="mr-2 h-4 w-4" />
            Đào tạo
          </TabsTrigger>
          <TabsTrigger value="party">
            <Users className="mr-2 h-4 w-4" />
            Đảng/Đoàn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div><span className="text-muted-foreground">Họ tên:</span> {person.fullName}</div>
              <div><span className="text-muted-foreground">Ngày sinh:</span> {person.dateOfBirth}</div>
              <div><span className="text-muted-foreground">Giới tính:</span> {person.gender === "male" ? "Nam" : "Nữ"}</div>
              <div><span className="text-muted-foreground">CCCD:</span> {person.idCardNumber}</div>
              <div><span className="text-muted-foreground">Nơi sinh:</span> {person.placeOfBirth}</div>
              <div><span className="text-muted-foreground">Quê quán:</span> {person.hometown}</div>
              <div><span className="text-muted-foreground">Dân tộc:</span> {person.ethnicity}</div>
              <div><span className="text-muted-foreground">Tôn giáo:</span> {person.religion}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Liên hệ</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div><span className="text-muted-foreground">Điện thoại:</span> {person.phoneNumber}</div>
              <div><span className="text-muted-foreground">Email cá nhân:</span> {person.personalEmail}</div>
              <div><span className="text-muted-foreground">Email công việc:</span> {person.workEmail}</div>
              <div className="col-span-2"><span className="text-muted-foreground">Địa chỉ:</span> {person.permanentAddress?.streetAddress}, {person.permanentAddress?.ward}, {person.permanentAddress?.district}, {person.permanentAddress?.province}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Lịch sử thay đổi
              </CardTitle>
            </CardHeader>
            <CardContent>
              {person.changeHistory && person.changeHistory.length > 0 ? (
                <div className="space-y-4">
                  {person.changeHistory.map((change, index) => (
                    <div key={change.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {index < person.changeHistory.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {change.action === 'create' && 'Tạo mới'}
                            {change.action === 'update' && 'Cập nhật'}
                            {change.action === 'delete' && 'Xóa'}
                            {change.action === 'status_change' && 'Thay đổi trạng thái'}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(change.performedAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Bởi: {change.performedBy}
                        </div>
                        {change.reason && (
                          <div className="text-sm mt-1">
                            <span className="text-muted-foreground">Lý do:</span> {change.reason}
                          </div>
                        )}
                        {change.fieldName && (
                          <div className="text-sm mt-1 text-muted-foreground">
                            Trường: {change.fieldName}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Chưa có lịch sử thay đổi</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Quá trình học vấn</CardTitle>
            </CardHeader>
            <CardContent>
              {person.education?.length > 0 ? (
                <div className="space-y-4">
                  {person.education.map((edu) => (
                    <div key={edu.id} className="p-4 border rounded-lg">
                      <div className="font-medium">{edu.degreeName}</div>
                      <div className="text-sm text-muted-foreground">{edu.school}</div>
                      <div className="text-sm">Chuyên ngành: {edu.major} • Năm tốt nghiệp: {edu.graduationYear} • Xếp loại: {edu.grade}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Chưa có thông tin học vấn</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Hợp đồng lao động</CardTitle>
              <Button onClick={() => navigate(`/tccb/contracts/new?personnelId=${id}`)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm hợp đồng
              </Button>
            </CardHeader>
            <CardContent>
              {contracts.length > 0 ? (
                <div className="space-y-4 pt-4">
                  {contracts.map((contract) => (
                    <div key={contract.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">{contract.contractNumber}</span>
                            {getContractStatusBadge(contract.status)}
                          </div>
                          <p className="text-sm text-muted-foreground font-medium">
                            {getContractTypeLabel(contract.type)}
                          </p>
                        </div>
                        {contract.status === "active" && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Thông báo",
                                description: "Chức năng gia hạn hợp đồng đang được phát triển",
                              });
                            }}>
                              <FileSignature className="mr-2 h-4 w-4" />
                              Gia hạn
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => {
                              toast({
                                title: "Thông báo",
                                description: "Chức năng chấm dứt hợp đồng đang được phát triển",
                              });
                            }}>
                              <Ban className="mr-2 h-4 w-4" />
                              Chấm dứt
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Ngày ký:</span> {new Date(contract.signDate).toLocaleDateString("vi-VN")}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Ngày hiệu lực:</span> {new Date(contract.effectiveDate).toLocaleDateString("vi-VN")}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Ngày hết hạn:</span> {contract.expiryDate ? new Date(contract.expiryDate).toLocaleDateString("vi-VN") : "Không xác định"}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Số lần gia hạn:</span> {contract.extensionCount || 0}
                        </div>
                      </div>
                      
                      {contract.jobDescription && (
                        <div className="text-sm bg-muted/50 p-2 rounded">
                          <span className="font-medium">Mô tả công việc:</span> {contract.jobDescription}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Chưa có thông tin hợp đồng
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salary">
          <Card>
            <CardHeader>
              <CardTitle>Lương & Phụ cấp</CardTitle>
            </CardHeader>
            <CardContent>
              {person.salaryScale ? (
                <div className="space-y-2">
                  <div><span className="text-muted-foreground">Ngạch lương:</span> {person.salaryScale.scaleType}</div>
                  <div><span className="text-muted-foreground">Bậc:</span> {person.salaryScale.grade}</div>
                  <div><span className="text-muted-foreground">Hệ số:</span> {person.salaryScale.coefficient}</div>
                </div>
              ) : (
                <p className="text-muted-foreground">Chưa có thông tin lương</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Khen thưởng & Kỷ luật</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Chưa có thông tin khen thưởng hoặc kỷ luật</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Đào tạo & Phát triển</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Chưa có thông tin đào tạo</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="party">
          <Card>
            <CardHeader>
              <CardTitle>Đảng viên & Đoàn viên</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {person.partyInfo ? (
                <div>
                  <h4 className="font-medium mb-2">Thông tin Đảng viên</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Ngày vào Đảng:</span> {person.partyInfo.joinDate}</div>
                    <div><span className="text-muted-foreground">Ngày chính thức:</span> {person.partyInfo.officialDate}</div>
                    <div className="col-span-2"><span className="text-muted-foreground">Chi bộ:</span> {person.partyInfo.branch}</div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Không phải Đảng viên</p>
              )}
              
              {person.unionInfo && (
                <div>
                  <h4 className="font-medium mb-2">Thông tin Công đoàn</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Ngày gia nhập:</span> {person.unionInfo.joinDate}</div>
                    <div><span className="text-muted-foreground">Số thẻ:</span> {person.unionInfo.cardNumber}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={isTerminateDialogOpen} onOpenChange={setIsTerminateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Đánh dấu thôi việc</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn đánh dấu nhân sự này đã thôi việc? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="termination-date">Ngày thôi việc</Label>
              <Input
                id="termination-date"
                type="date"
                value={terminationDate}
                onChange={(e) => setTerminationDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="termination-reason">Lý do</Label>
              <Textarea
                id="termination-reason"
                placeholder="Nhập lý do thôi việc..."
                value={terminationReason}
                onChange={(e) => setTerminationReason(e.target.value)}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setTerminationDate("");
              setTerminationReason("");
            }}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleTerminate}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
