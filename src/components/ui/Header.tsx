"use client";

import { useState } from "react";
import { APP_NAME } from "~/lib/constants";
import sdk from "@farcaster/frame-sdk";
import { useMiniApp } from "@neynar/react";

type HeaderProps = {
  neynarUser?: {
    fid: number;
    score: number;
  } | null;
};

export function Header({ neynarUser }: HeaderProps) {
  const { context } = useMiniApp();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [hasClickedPfp, setHasClickedPfp] = useState(false);

  return (
    <div className="relative">
      <div className="mb-1 py-3 px-4 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-2xl flex items-center justify-between border border-blue-500/30 shadow-lg shadow-blue-500/10">
        <div className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          {APP_NAME}
        </div>
        {context?.user && (
          <div
            className="cursor-pointer relative group"
            onClick={() => {
              setIsUserDropdownOpen(!isUserDropdownOpen);
              setHasClickedPfp(true);
            }}
          >
            {context.user.pfpUrl && (
              <img
                src={context.user.pfpUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-500 ring-2 ring-blue-500/20 transition-all duration-300 group-hover:ring-4 group-hover:ring-blue-500/40"
              />
            )}
          </div>
        )}
      </div>
      {context?.user && (
        <>
          {!hasClickedPfp && (
            <div className="absolute right-0 -bottom-6 text-xs text-blue-500 flex items-center justify-end gap-1 pr-2 animate-bounce">
              <span className="text-[10px]">↑</span> Click PFP!{" "}
              <span className="text-[10px]">↑</span>
            </div>
          )}

          {isUserDropdownOpen && (
            <div className="absolute top-full right-0 z-50 w-fit mt-2 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-500/30 shadow-blue-500/20">
              <div className="p-4 space-y-2 min-w-[200px]">
                <div className="text-right">
                  <h3
                    className="font-bold text-sm hover:text-blue-500 cursor-pointer inline-block transition-colors duration-200"
                    onClick={() =>
                      sdk.actions.viewProfile({ fid: context.user.fid })
                    }
                  >
                    {context.user.displayName || context.user.username}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    @{context.user.username}
                  </p>
                  <p className="text-xs text-blue-400">
                    FID: {context.user.fid}
                  </p>
                  {neynarUser && (
                    <>
                      <p className="text-xs text-blue-400">
                        Neynar Score: {neynarUser.score}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
