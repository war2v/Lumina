"use client";

import { QRCodeSVG } from "qrcode.react";

export function QRJoinCode({
  joinCode,
  presentation_id,
}: {
  joinCode: string;
  presentation_id: string;
}) {
  const joinUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/user/home/presentation/${presentation_id}/${joinCode}`;

  return (
    <div className="flex flex-col items-center">
      <QRCodeSVG
        value={joinUrl}
        level="M"
        size={75}
        bgColor="#FFBF60FF"
        fgColor="#010599FF"
        includeMargin={true}
      />
      <p className="mt-2 text-sm text-gray-500">Scan to join</p>
    </div>
  );
}
