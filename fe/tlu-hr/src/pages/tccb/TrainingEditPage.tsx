import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import trainingData from "@/data/training.json";

// Define types based on the JSON structure
interface Participant {
  id: string;
  personnelId: string;
  courseId: string;
  status: string;
  registrationDate: string;
}

interface TrainingCourse {
  id: string;
  name: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  status: string;
  maxParticipants?: number;
  participants: Participant[];
  budget?: number;
  commitmentPeriod?: number;
  registrationOpenDate?: string;
  registrationCloseDate?: string;
  certificateType?: string;
  planId: string;
  createdAt: string;
  updatedAt: string;
}

export default function TrainingEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<TrainingCourse | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [commitmentPeriod, setCommitmentPeriod] = useState("");
  const [registrationOpenDate, setRegistrationOpenDate] = useState("");
  const [registrationCloseDate, setRegistrationCloseDate] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [certificateType, setCertificateType] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const foundCourse = (trainingData as TrainingCourse[]).find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
      // Initialize form fields
      setName(foundCourse.name);
      setType(foundCourse.type);
      setDescription(foundCourse.description);
      setStartDate(foundCourse.startDate);
      setEndDate(foundCourse.endDate);
      setLocation(foundCourse.location);
      setBudget(foundCourse.budget ? foundCourse.budget.toString() : "");
      setCommitmentPeriod(foundCourse.commitmentPeriod ? foundCourse.commitmentPeriod.toString() : "");
      setRegistrationOpenDate(foundCourse.registrationOpenDate || "");
      setRegistrationCloseDate(foundCourse.registrationCloseDate || "");
      setMaxParticipants(foundCourse.maxParticipants ? foundCourse.maxParticipants.toString() : "");
      setCertificateType(foundCourse.certificateType || "");
    }
    setIsLoading(false);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!name) newErrors.name = "Vui lòng nhập tên khóa học";
    if (!type) newErrors.type = "Vui lòng chọn loại đào tạo";
    if (!startDate) newErrors.startDate = "Vui lòng nhập ngày bắt đầu";
    if (!endDate) newErrors.endDate = "Vui lòng nhập ngày kết thúc";
    if (!location) newErrors.location = "Vui lòng nhập địa điểm";

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.dates = "Ngày kết thúc phải sau ngày bắt đầu";
    }

    if (registrationOpenDate && registrationCloseDate && new Date(registrationOpenDate) > new Date(registrationCloseDate)) {
      newErrors.registrationDates = "Ngày đóng đăng ký phải sau ngày mở đăng ký";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && course) {
      // Find index and update
      const index = (trainingData as TrainingCourse[]).findIndex(c => c.id === id);
      if (index !== -1) {
        (trainingData as any)[index] = {
          ...trainingData[index],
          name,
          type,
          description,
          startDate,
          endDate,
          location,
          budget: budget ? Number(budget) : undefined,
          commitmentPeriod: commitmentPeriod ? Number(commitmentPeriod) : undefined,
          registrationOpenDate: registrationOpenDate || undefined,
          registrationCloseDate: registrationCloseDate || undefined,
          maxParticipants: maxParticipants ? Number(maxParticipants) : undefined,
          certificateType: certificateType || undefined,
          updatedAt: new Date().toISOString(),
        };
      }
      
      toast.success("Cập nhật khóa đào tạo thành công");
      navigate(`/tccb/training/${id}`);
    } else if (Object.keys(newErrors).length > 0) {
      toast.error("Vui lòng kiểm tra lại thông tin");
    }
  };

  if (isLoading) {
    return <div className="container mx-auto py-8 text-center">Đang tải dữ liệu...</div>;
  }

  if (!course) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="mb-4">Không tìm thấy khóa đào tạo</p>
        <Button onClick={() => navigate("/tccb/training")}>Quay lại danh sách</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Button 
        variant="ghost" 
        className="mb-4 pl-0 hover:bg-transparent hover:underline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại
      </Button>

      {course.participants && course.participants.length > 0 && (
        <Alert className="mb-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Lưu ý</AlertTitle>
          <AlertDescription>
            Khóa học đã có {course.participants.length} học viên đăng ký.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Chỉnh sửa Khóa Đào Tạo</CardTitle>
          <CardDescription>
            Cập nhật thông tin khóa đào tạo: {course.name}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            
            <div className="space-y-2">
              <Label htmlFor="name">Tên khóa học <span className="text-red-500">*</span></Label>
              <Input 
                id="name" 
                placeholder="Nhập tên khóa học" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Loại hình đào tạo <span className="text-red-500">*</span></Label>
                <Select onValueChange={setType} value={type}>
                  <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                    <SelectValue placeholder="Chọn loại hình" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="domestic">Trong nước</SelectItem>
                    <SelectItem value="international">Quốc tế</SelectItem>
                    <SelectItem value="short_term">Ngắn hạn</SelectItem>
                    <SelectItem value="long_term">Dài hạn</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Địa điểm <span className="text-red-500">*</span></Label>
                <Input 
                  id="location" 
                  placeholder="Nhập địa điểm" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Ngày bắt đầu <span className="text-red-500">*</span></Label>
                <Input 
                  id="startDate" 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={errors.startDate ? "border-red-500" : ""}
                />
                {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">Ngày kết thúc <span className="text-red-500">*</span></Label>
                <Input 
                  id="endDate" 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={errors.endDate ? "border-red-500" : ""}
                />
                {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
              </div>
            </div>

            {errors.dates && (
              <div className="flex items-center text-red-500 text-sm bg-red-50 p-2 rounded">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errors.dates}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Kinh phí dự kiến (VNĐ)</Label>
                <Input 
                  id="budget" 
                  type="number" 
                  placeholder="Nhập số tiền" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commitmentPeriod">Thời gian cam kết (tháng)</Label>
                <Input 
                  id="commitmentPeriod" 
                  type="number" 
                  placeholder="Số tháng" 
                  value={commitmentPeriod}
                  onChange={(e) => setCommitmentPeriod(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registrationOpenDate">Ngày mở đăng ký</Label>
                <Input 
                  id="registrationOpenDate" 
                  type="date" 
                  value={registrationOpenDate}
                  onChange={(e) => setRegistrationOpenDate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="registrationCloseDate">Ngày đóng đăng ký</Label>
                <Input 
                  id="registrationCloseDate" 
                  type="date" 
                  value={registrationCloseDate}
                  onChange={(e) => setRegistrationCloseDate(e.target.value)}
                />
              </div>
            </div>

            {errors.registrationDates && (
              <div className="flex items-center text-red-500 text-sm bg-red-50 p-2 rounded">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errors.registrationDates}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Số lượng tham gia tối đa</Label>
                <Input 
                  id="maxParticipants" 
                  type="number" 
                  placeholder="Nhập số lượng" 
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificateType">Loại chứng chỉ</Label>
                <Input 
                  id="certificateType" 
                  placeholder="Tên chứng chỉ" 
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả chi tiết</Label>
              <Textarea 
                id="description" 
                placeholder="Nhập mô tả về khóa học..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t pt-6">
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>Hủy</Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Lưu thay đổi
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
