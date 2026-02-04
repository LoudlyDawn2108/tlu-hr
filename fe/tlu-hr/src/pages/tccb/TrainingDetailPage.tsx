import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Pencil, UserPlus, MoreHorizontal, ClipboardEdit, Calendar, MapPin, Wallet, Users, Clock } from "lucide-react";
import { formatTrainingType, formatParticipantStatus } from "@/utils/training-helpers";
import trainingData from "@/data/training.json";
import personnelData from "@/data/personnel.json";
import { EnrollPersonnelDialog } from "@/components/training/EnrollPersonnelDialog";
import { UpdateProgressDialog } from "@/components/training/UpdateProgressDialog";
import type { TrainingCourse, TrainingParticipation } from "@/types";
import { TrainingStatus, ParticipantStatus } from "@/types";

export default function TrainingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find course initial state
  const foundCourse = (trainingData as unknown as TrainingCourse[]).find(c => c.id === id);
  const [course, setCourse] = useState<TrainingCourse | undefined>(foundCourse);

  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [progressDialogOpen, setProgressDialogOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<TrainingParticipation | null>(null);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy khóa học</h2>
        <Button onClick={() => navigate("/tccb/training")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại danh sách
        </Button>
      </div>
    );
  }

  const getPersonnelName = (personnelId: string) => {
    const person = (personnelData as any[]).find(p => p.id === personnelId);
    return person?.fullName || "Không xác định";
  };

  const getStatusBadge = (status: TrainingStatus) => {
    switch (status) {
      case TrainingStatus.PLANNED:
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Đang lên kế hoạch</Badge>;
      case TrainingStatus.OPEN:
        return <Badge className="bg-green-500 hover:bg-green-600">Đang mở đăng ký</Badge>;
      case TrainingStatus.IN_PROGRESS:
        return <Badge className="bg-blue-500 hover:bg-blue-600">Đang diễn ra</Badge>;
      case TrainingStatus.COMPLETED:
        return <Badge variant="secondary">Đã hoàn thành</Badge>;
      case TrainingStatus.CANCELLED:
        return <Badge variant="destructive">Đã hủy</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getParticipantStatusBadge = (status: ParticipantStatus) => {
     switch (status) {
      case ParticipantStatus.REGISTERED:
        return <Badge variant="secondary">Đã đăng ký</Badge>;
      case ParticipantStatus.STUDYING:
        return <Badge variant="default">Đang học</Badge>;
      case ParticipantStatus.COMPLETED:
        return <Badge variant="outline" className="text-green-600 border-green-600">Hoàn thành</Badge>;
      case ParticipantStatus.DROPPED:
        return <Badge variant="destructive">Bỏ dở</Badge>;
      default:
        return <Badge variant="outline">{formatParticipantStatus(status)}</Badge>;
    }
  };
  
  const formatDate = (dateString?: string) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const formatCurrency = (amount?: number) => {
      if (!amount) return "0 ₫";
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/tccb/training")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
             <h1 className="text-2xl font-bold tracking-tight">{course.name}</h1>
             {getStatusBadge(course.status)}
          </div>
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            <span className="font-medium">{formatTrainingType(course.type)}</span>
             • 
            <span>{formatDate(course.startDate)} - {formatDate(course.endDate)}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate(`/tccb/training/${id}/edit`)}>
                <Pencil className="mr-2 h-4 w-4" />
                Chỉnh sửa
            </Button>
            <Button onClick={() => setEnrollDialogOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Thêm nhân sự
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Course Info Card - Left Column */}
        <Card className="md:col-span-1 h-fit">
            <CardHeader>
                <CardTitle>Thông tin chi tiết</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Địa điểm
                    </span>
                    <p>{course.location}</p>
                </div>
                
                 <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Wallet className="h-4 w-4" /> Ngân sách
                    </span>
                    <p>{formatCurrency(course.budget)}</p>
                </div>

                <div className="space-y-1">
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <Users className="h-4 w-4" /> Số lượng
                    </span>
                    <p>{course.participants.length} / {course.maxParticipants || "Không giới hạn"} đã đăng ký</p>
                </div>

                {course.commitmentPeriod && (
                    <div className="space-y-1">
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                             <Clock className="h-4 w-4" /> Thời gian cam kết
                        </span>
                        <p>{course.commitmentPeriod} tháng</p>
                    </div>
                )}
                
                 {(course.registrationOpenDate || course.registrationCloseDate) && (
                    <div className="space-y-1">
                        <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                             <Calendar className="h-4 w-4" /> Thời gian đăng ký
                        </span>
                        <p className="text-sm">
                            {formatDate(course.registrationOpenDate)} - {formatDate(course.registrationCloseDate)}
                        </p>
                    </div>
                )}

                 {course.certificateType && (
                    <div className="space-y-1">
                        <span className="text-sm font-medium text-muted-foreground">Chứng chỉ</span>
                        <p>{course.certificateType}</p>
                    </div>
                )}
                
                {course.description && (
                     <div className="space-y-1 pt-2 border-t">
                        <span className="text-sm font-medium text-muted-foreground">Mô tả</span>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{course.description}</p>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* Participants Table - Right Column (Span 2) */}
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Danh sách nhân sự tham gia ({course.participants.length})</CardTitle>
                <CardDescription>Quản lý danh sách và trạng thái đào tạo của nhân sự</CardDescription>
            </CardHeader>
            <CardContent>
                {course.participants.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên nhân sự</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Ngày đăng ký</TableHead>
                                <TableHead>Ngày hoàn thành</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {course.participants.map((participant) => (
                                <TableRow key={participant.id}>
                                    <TableCell className="font-medium">
                                        {getPersonnelName(participant.personnelId)}
                                    </TableCell>
                                    <TableCell>
                                        {getParticipantStatusBadge(participant.status)}
                                    </TableCell>
                                    <TableCell>{formatDate(participant.registrationDate)}</TableCell>
                                    <TableCell>{participant.completionDate ? formatDate(participant.completionDate) : "-"}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => {
                                                    setSelectedParticipant(participant);
                                                    setProgressDialogOpen(true);
                                                }}>
                                                    <ClipboardEdit className="mr-2 h-4 w-4" />
                                                    Cập nhật tiến trình
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        Chưa có nhân sự nào đăng ký tham gia khóa học này.
                    </div>
                )}
            </CardContent>
        </Card>
      </div>

        {/* Dialog Placeholders */}
        {enrollDialogOpen && (
          <EnrollPersonnelDialog
            course={course}
            isOpen={enrollDialogOpen}
            onClose={() => setEnrollDialogOpen(false)}
            onSuccess={(participation) => {
              const updatedParticipants = [...course.participants, participation];
              setCourse({ ...course, participants: updatedParticipants });
              setEnrollDialogOpen(false);
            }}
          />
        )}
        {progressDialogOpen && selectedParticipant && (
            <UpdateProgressDialog
              course={course}
              participation={selectedParticipant}
              personnelName={getPersonnelName(selectedParticipant.personnelId)}
              isOpen={progressDialogOpen}
              onClose={() => {
                setProgressDialogOpen(false);
                setSelectedParticipant(null);
              }}
              onSuccess={(updatedParticipation, _certificate) => {
                const updatedParticipants = course.participants.map(p =>
                  p.id === updatedParticipation.id ? updatedParticipation : p
                );
                setCourse({ ...course, participants: updatedParticipants });
                setProgressDialogOpen(false);
                setSelectedParticipant(null);
              }}
            />
        )}
    </div>
  );
}
