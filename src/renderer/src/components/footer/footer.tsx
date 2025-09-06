/* eslint-disable react/require-default-props */
import { Box, Textarea, IconButton, HStack } from "@chakra-ui/react";
import { BsMicFill, BsMicMuteFill, BsPaperclip } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { InputGroup } from "@/components/ui/input-group";
import { footerStyles } from "./footer-styles";
import AIStateIndicator from "./ai-state-indicator";
import { useFooter } from "@/hooks/footer/use-footer";

// Type definitions
interface FooterProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

interface ToggleButtonProps {
  isCollapsed: boolean;
  onToggle?: () => void;
}

interface ActionButtonsProps {
  micOn: boolean;
  onMicToggle: () => void;
  onInterrupt: () => void;
}

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onCompositionStart: () => void;
  onCompositionEnd: () => void;
}

// Reusable components
const ToggleButton = memo(({ isCollapsed, onToggle }: ToggleButtonProps) => (
  <Box
    {...footerStyles.footer.toggleButton}
    onClick={onToggle}
    color="whiteAlpha.500"
    style={{
      transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <FiChevronDown />
  </Box>
));

ToggleButton.displayName = "ToggleButton";

const ActionButtons = memo(
  ({ micOn, onMicToggle }: Omit<ActionButtonsProps, "onInterrupt">) => (
    <HStack gap={3}>
      <IconButton
        bg={micOn ? "rgba(34, 197, 94, 0.8)" : "rgba(239, 68, 68, 0.8)"}
        {...footerStyles.footer.actionButton}
        onClick={onMicToggle}
      >
        {micOn ? <BsMicFill size="20" /> : <BsMicMuteFill size="20" />}
      </IconButton>
    </HStack>
  )
);

ActionButtons.displayName = "ActionButtons";

const MessageInput = memo(
  ({
    value,
    onChange,
    onKeyDown,
    onCompositionStart,
    onCompositionEnd,
  }: MessageInputProps) => {
    const { t } = useTranslation();

    return (
      <InputGroup flex={1}>
        <Box position="relative" width="100%">
          <IconButton
            aria-label="Attach file"
            variant="ghost"
            {...footerStyles.footer.attachButton}
            size="sm"
          >
            <BsPaperclip size="18" />
          </IconButton>
          <Textarea
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onCompositionStart={onCompositionStart}
            onCompositionEnd={onCompositionEnd}
            placeholder={t("footer.typeYourMessage")}
            {...footerStyles.footer.input}
          />
        </Box>
      </InputGroup>
    );
  }
);

MessageInput.displayName = "MessageInput";

// Main component
function Footer({ isCollapsed = false, onToggle }: FooterProps): JSX.Element {
  const {
    inputValue,
    handleInputChange,
    handleKeyPress,
    handleCompositionStart,
    handleCompositionEnd,
    handleMicToggle,
    micOn,
  } = useFooter();

  return (
    <Box {...footerStyles.footer.container(isCollapsed)}>
      <ToggleButton isCollapsed={isCollapsed} onToggle={onToggle} />

      <Box pt="0" px="4">
        <HStack width="100%" gap={4}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box mb="1.5">
              <AIStateIndicator />
            </Box>
            <ActionButtons micOn={micOn} onMicToggle={handleMicToggle} />
          </Box>

          <MessageInput
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
        </HStack>
      </Box>
    </Box>
  );
}

export default Footer;
