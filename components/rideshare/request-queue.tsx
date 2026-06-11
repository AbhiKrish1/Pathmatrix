"use client";

import { RideRequest } from "@/lib/rideshare-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownUp, Check, Clock, MapPin, User, X } from "lucide-react";

interface RequestQueueProps {
  requests: RideRequest[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  capacityReached: boolean;
}

const glassCard = "border-white/10 bg-white/5 text-white shadow-lg backdrop-blur-md transition-all duration-200";

const STATUS_BADGES: Record<string, string> = {
  pending: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  accepted: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  rejected: "border-slate-500/30 bg-slate-500/10 text-slate-400",
  completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
};

export default function RequestQueue({
  requests,
  onAccept,
  onReject,
  capacityReached,
}: RequestQueueProps) {
  return (
    <div className="flex flex-col gap-3">
      {requests.length === 0 ? (
        <div className="flex h-32 items-center justify-center text-slate-400 text-sm border border-dashed border-white/10 rounded-xl">
          No requests in queue.
        </div>
      ) : (
        requests.map((req) => {
          const isPending = req.status === "pending";
          const isAccepted = req.status === "accepted";
          const isRejected = req.status === "rejected";

          return (
            <Card
              key={req.id}
              className={cn(
                glassCard,
                "overflow-hidden border border-white/5",
                isAccepted && "border-cyan-500/20 bg-cyan-950/5",
                isRejected && "opacity-50 border-white/5"
              )}
            >
              <CardContent className="p-4 space-y-3">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-white/5 text-slate-300">
                      <User className="size-3.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-xs">{req.passengerName}</h4>
                      <p className="text-[10px] text-slate-500">Fare: ₹{req.fare}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5", STATUS_BADGES[req.status])}
                  >
                    {req.status}
                  </Badge>
                </div>

                {/* Pickup & Dropoff */}
                <div className="relative pl-4 space-y-2 text-xs border-l border-white/10 ml-3.5">
                  <div className="absolute -left-[5px] top-[4px] size-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Pickup</p>
                    <p className="text-slate-300 font-medium truncate max-w-[280px]">{req.pickup}</p>
                  </div>
                  
                  <div className="absolute -left-[5px] top-[32px] size-2.5 rounded-full bg-rose-500 border-2 border-slate-950" />
                  <div className="pt-1">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase">Dropoff</p>
                    <p className="text-slate-300 font-medium truncate max-w-[280px]">{req.dropoff}</p>
                  </div>
                </div>

                {/* Flexibility Window */}
                <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3 text-cyan-400" />
                    Flexibility: {req.flexibilityWindow}
                  </span>
                  <span className="flex items-center gap-1">
                    <ArrowDownUp className="size-3 text-emerald-400" />
                    {req.distance} km
                  </span>
                </div>

                {/* Action buttons */}
                {isPending && (
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:brightness-110 font-semibold text-xs py-1"
                      onClick={() => onAccept(req.id)}
                      disabled={capacityReached}
                    >
                      <Check className="size-3 mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white text-xs py-1"
                      onClick={() => onReject(req.id)}
                    >
                      <X className="size-3 mr-1" />
                      Decline
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
