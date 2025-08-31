import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

interface VoiceButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isListening?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "secondary" | "ghost" | "outline";
}

const VoiceButton = React.forwardRef<HTMLButtonElement, VoiceButtonProps>(
  ({ className, isListening = false, size = "default", variant = "default", children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "relative transition-all duration-300",
          isListening && "voice-pulse shadow-voice",
          className
        )}
        {...props}
      >
        {isListening ? (
          <MicOff className="h-4 w-4 text-voice-active" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
        {children && <span className="ml-2">{children}</span>}
      </Button>
    );
  }
);

VoiceButton.displayName = "VoiceButton";

export { VoiceButton };