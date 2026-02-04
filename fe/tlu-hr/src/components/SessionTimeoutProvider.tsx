import { useEffect } from "react";
import { useSessionTimeout } from "@/hooks/useSessionTimeout";
import { useAuthStore } from "@/stores/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SessionTimeoutProviderProps {
  children: React.ReactNode;
}

export default function SessionTimeoutProvider({
  children,
}: SessionTimeoutProviderProps) {
  const { logout, isAuthenticated } = useAuthStore();
  const { isWarningVisible, remainingSeconds, resetTimer } = useSessionTimeout({
    onTimeout: logout,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated && !isWarningVisible) {
      resetTimer();
    }
  }, [isAuthenticated, isWarningVisible, resetTimer]);

  return (
    <>
      {children}
      <Dialog open={isWarningVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phiên làm việc sắp hết hạn</DialogTitle>
            <DialogDescription>
              Bạn sẽ tự động đăng xuất sau {remainingSeconds} giây do không hoạt
              động. Vui lòng tiếp tục thao tác để giữ phiên làm việc.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={resetTimer}>Tiếp tục phiên làm việc</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
