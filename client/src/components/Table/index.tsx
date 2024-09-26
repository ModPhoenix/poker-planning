import { ReloadIcon } from "@radix-ui/react-icons";
import { ReactElement } from "react";

import { useResetGameMutation, useShowCardsMutation } from "@/api";
import { useModal } from "@/components";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TableProps {
  roomId: string;
  isCardsPicked: boolean;
  isGameOver: boolean;
}

export function Table({
  roomId,
  isCardsPicked,
  isGameOver,
}: TableProps): ReactElement {
  const { toast } = useToast();

  const startNewGame = useModal({
    title: "Are you sure you want to start a new game?",
    description: "This will reset the current game.",
    confirmationText: "Start new game",
    cancellationText: "Cancel",
  });
  const [showCardsMutation, { loading: showCardLoading }] =
    useShowCardsMutation({
      onError: (error) => {
        toast({
          title: "Error",
          description: `Show cards: ${error.message}`,
          variant: "destructive",
        });
      },
    });

  const [resetGameMutation, { loading: resetGameLoading }] =
    useResetGameMutation({
      onError: (error) => {
        toast({
          title: "Error",
          description: `Reset game: ${error.message}`,
          variant: "destructive",
        });
      },
    });

  function handleShowCards() {
    showCardsMutation({
      variables: {
        roomId,
      },
    });
  }

  function handleResetGame() {
    startNewGame().then(() => {
      resetGameMutation({
        variables: {
          roomId,
        },
      });
    });
  }

  return (
    <div className="flex justify-center items-center w-72 h-36 border border-primary-500 rounded-lg">
      {isCardsPicked ? (
        isGameOver ? (
          <Button
            onClick={handleResetGame}
            disabled={resetGameLoading}
            size="lg"
          >
            {resetGameLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Start new game
          </Button>
        ) : (
          <Button
            onClick={handleShowCards}
            disabled={showCardLoading}
            size="lg"
          >
            {showCardLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Show cards
          </Button>
        )
      ) : (
        <span>Just start picking cards!</span>
      )}
    </div>
  );
}
