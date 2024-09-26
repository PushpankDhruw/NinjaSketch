'use client'
import { useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "./control-panel-style.css";
import { PiMinus, PiPlus } from "react-icons/pi";
import { FiGithub } from "react-icons/fi";
import {
  HiOutlineArrowUturnLeft,
  HiOutlineArrowUturnRight,
} from "react-icons/hi2";

type ControlPanelProps = {
  undo: () => void;
  redo: () => void;
  onZoom: (scale: number) => void;
  scale: number;
  setScale: (scale: number) => void;
};

export function ControlPanel({
  undo,
  redo,
  onZoom,
  scale,
  setScale,
}: ControlPanelProps) {
  // Handle mouse scroll zoom
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault(); // Prevent default scroll behavior
      const zoomAmount = event.deltaY > 0 ? -0.1 : 0.1; // Zoom in or out based on scroll direction
      onZoom(zoomAmount);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [onZoom]);

  return (
    <>
      <div className="controlPanel">
        <div className="zoomPanel">
          <Tippy content="Zoom Out">
            <button onClick={() => onZoom(-0.1)} aria-label="Zoom Out">
              <PiMinus />
            </button>
          </Tippy>
          <Tippy content={`Set scale to 100%`}>
            <button
              onClick={() => setScale(1)}
              aria-label={`Set scale to 100%`}
            >
              {new Intl.NumberFormat("en-GB", { style: "percent" }).format(
                scale
              )}
            </button>
          </Tippy>
          <Tippy content="Zoom In">
            <button onClick={() => onZoom(0.1)} aria-label="Zoom In">
              <PiPlus />
            </button>
          </Tippy>
        </div>

        <div className="editPanel">
          <Tippy content="Undo last action">
            <button onClick={undo} aria-label="Undo last action">
              <HiOutlineArrowUturnLeft />
            </button>
          </Tippy>
          <Tippy content="Redo last action">
            <button onClick={redo} aria-label="Redo last action">
              <HiOutlineArrowUturnRight />
            </button>
          </Tippy>
        </div>
      </div>
      <a
        className="link"
        href="https://github.com/PushpankDhruw/NinjaSketch"
        target="_blank"
        rel="noopener noreferrer" // Improved security
      >
        <FiGithub />
        Created by ⚡Pushpank
      </a>
    </>
  );
}
