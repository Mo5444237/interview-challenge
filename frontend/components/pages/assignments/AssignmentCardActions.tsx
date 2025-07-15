import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { IoIosArrowDropdown } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import EditAssignmentModal from './EditAssignmentModal';
import { useDeleteAssignment } from '@/lib/api/assignments/useDeleteAssignment';
import { Assignment } from '@/types';

interface AssignmentCardActionsProps {
  assignment: Assignment;
}

export default function AssignmentCardActions({
  assignment,
}: AssignmentCardActionsProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const { mutate: deleteAssignment, isPending } = useDeleteAssignment();

  const handleDelete = async () => {
    deleteAssignment(assignment.id, {
      onSuccess: () => {
        setIsDeleting(false);
      },
    });
  };

  return (
    <>
      <EditAssignmentModal
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        startDate={assignment.startDate}
        days={assignment.days}
        assignmentId={assignment.id}
      />
      <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              assignment and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              onClick={handleDelete}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            title="Actions"
            aria-label="Actions"
            className="flex items-center justify-center"
          >
            <p>Actions</p>
            <IoIosArrowDropdown size={16} className="mt-[1px]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsEditing(true)}>
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setIsDeleting(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
