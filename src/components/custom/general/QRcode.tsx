"use client"
import { useQRCode } from 'next-qrcode'

export function QRJoinCode({ joinCode, presentation_id }: { joinCode: string, presentation_id: string }) {
  const joinUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/user/presentation/${presentation_id}/${joinCode}`;
  const { Canvas } = useQRCode();

  return (
    <div>
        <Canvas
            text={joinUrl}
            options={{
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 4,
                width: 75,
                color: {
                dark: '#010599FF',
                light: '#FFBF60FF',
                },
            }}
        />

    
      <p className="mt-2 text-sm text-gray-500">Scan to join</p>
    </div>
  );
}
