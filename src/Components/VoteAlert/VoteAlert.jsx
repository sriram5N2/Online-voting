import { CheckCircleIcon } from "@chakra-ui/icons";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";
import React from "react";

function VoteAlert({ isOpen, setIsConfirm, setIsOpen }) {
    const onClose = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <AlertDialog isOpen={isOpen} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Choice Alert!
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't change your vote afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button
                                colorScheme="green"
                                rightIcon={<CheckCircleIcon />}
                                onClick={() => {
                                    setIsConfirm(true);
                                    onClose();
                                }}
                                ml={3}
                            >
                                Vote
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    );
}

export default VoteAlert;
