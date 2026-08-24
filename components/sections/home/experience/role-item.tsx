"use client";

import { DiaTextReveal } from "@/components/ui/dia-text-rv";
import { Role } from "@/types/experience";

interface RoleItemProps {
  role: Role;
  index: number;
  total: number;
  isMain?: boolean;
}

export const RoleItem = ({
  role,
  index,
  total,
  isMain,
}: RoleItemProps) => {
  return (
    <div className="flex gap-4 items-stretch pl-4">
      {/* vertical timeline line */}
      <div className="flex flex-col items-center">
        <div className="w-1.5 h-1.5 rounded-full bg-(--border) mt-1.5 shrink-0" />
        {(index < total - 1) && (
          <div className="w-px flex-1 bg-(--border)/30 my-1" />
        )}
      </div>
      <div className="flex flex-col gap-0.5 pb-4">
        <span className="text-[13px] font-medium text-(--body)">
          {isMain ? (
            <DiaTextReveal
              text={role.position}
              delay={0.4}
              duration={1.2}
              textColor="var(--body)"
            />
          ) : (
            role.position
          )}
        </span>
        <span className="text-[11px] font-light text-(--subtext)">
          {isMain ? (
            <DiaTextReveal
              text={`${role.dateRange} — ${role.duration}`}
              delay={0.4}
              duration={1.2}
              textColor="var(--subtext)"
            />
          ) : (
            `${role.dateRange} — ${role.duration}`
          )}
        </span>
      </div>
    </div>
  );
};
