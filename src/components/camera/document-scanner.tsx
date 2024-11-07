import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Camera, Download, RotateCcw } from 'lucide-react';

interface DocumentScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (image: string) => void;
}

export default function DocumentScanner({
  open,
  onOpenChange,
  onCapture,
}: DocumentScannerProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const save = () => {
    if (imgSrc) {
      onCapture(imgSrc);
      onOpenChange(false);
      setImgSrc(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Document</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          {!imgSrc ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
              />
              <Button onClick={capture} className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                Capture
              </Button>
            </>
          ) : (
            <>
              <img src={imgSrc} alt="Document" className="w-full rounded-lg" />
              <div className="flex w-full gap-2">
                <Button variant="outline" onClick={retake}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake
                </Button>
                <Button onClick={save}>
                  <Download className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}