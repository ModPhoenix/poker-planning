import { ReactElement, useRef, useEffect, useState } from "react";
import { Player } from "@/components/Player";
import { Table } from "@/components/Table";
import { Room as RoomType } from "@/types";
import { getPickedUserCard } from "@/utils";

interface RoomProps {
  room: RoomType | undefined;
}

interface Position {
  x: number;
  y: number;
}

export function Room({ room }: RoomProps): ReactElement {
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableRect, setTableRect] = useState<DOMRect | null>(null);
  const [playerPositions, setPlayerPositions] = useState<Position[]>([]);

  useEffect(() => {
    const updateTableRect = () => {
      if (tableRef.current) {
        setTableRect(tableRef.current.getBoundingClientRect());
      }
    };

    updateTableRect();
    window.addEventListener("resize", updateTableRect);

    return () => window.removeEventListener("resize", updateTableRect);
  }, []);

  useEffect(() => {
    if (tableRect && room) {
      const totalPlayers = room.users.length;
      const positions: Position[] = [];

      const tableWidth = tableRect.width;
      const tableHeight = tableRect.height;
      const padding = 80; // Increased padding for better spacing

      const calculatePosition = (index: number) => {
        let x, y;
        const sideCount = Math.floor(totalPlayers / 4);
        const topBottomCount = Math.ceil(totalPlayers / 2) - sideCount;

        if (index < topBottomCount) {
          // Top row
          x = (tableWidth * (index + 1)) / (topBottomCount + 1);
          y = -padding;
        } else if (index < topBottomCount + sideCount) {
          // Right side
          x = tableWidth + padding;
          y =
            (tableHeight * (index - topBottomCount - 0.3)) / (sideCount - 1.7);
        } else if (index < 2 * topBottomCount + sideCount) {
          // Bottom row
          x =
            (tableWidth * (index - topBottomCount - sideCount + 1)) /
            (topBottomCount + 1);
          y = tableHeight + padding;
        } else {
          // Left side
          x = -padding;
          y =
            (tableHeight * (index - 2 * topBottomCount - sideCount - 0.3)) /
            (sideCount - 1.7);
        }

        return { x, y };
      };

      for (let i = 0; i < totalPlayers; i++) {
        positions.push(calculatePosition(i));
      }

      setPlayerPositions(positions);
    }
  }, [tableRect, room]);

  if (!room) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-120px)]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-120px)]">
      <div className="relative">
        <Table
          innerRef={tableRef}
          roomId={room.id}
          isCardsPicked={Boolean(room.game.table.length)}
          isGameOver={room.isGameOver}
        />
        {room.users.map((user, index) => {
          const position = playerPositions[index];
          const pickedCard = getPickedUserCard(user.id, room.game.table);

          if (!position) return null;

          return (
            <div
              key={user.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: 10,
              }}
            >
              <Player
                username={user.username}
                isCardPicked={Boolean(pickedCard)}
                isGameOver={room.isGameOver}
                card={pickedCard?.card}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
