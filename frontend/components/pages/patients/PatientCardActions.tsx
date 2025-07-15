import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useDeletePatient } from '@/lib/api/patients/useDeletePatient';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface PatientCardActionsProps {
  patientId: string;
  onEdit: () => void;
}

export default function PatientCardActions({
  patientId,
  onEdit,
}: PatientCardActionsProps) {
  const { mutate: deletePatient, isPending } = useDeletePatient();

  return (
    <>
      <p className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-sky-500 hover:text-sky-700 hover:bg-sky-100 transition-colors duration-200 cursor-pointer"
          onClick={onEdit}
          title="Edit patient"
          aria-label="Edit patient"
        >
          Edit
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors duration-200 cursor-pointer"
              title="Delete patient"
              aria-label="Delete patient"
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                patient and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                onClick={() => {
                  deletePatient(patientId);
                }}
              >
                {isPending ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </p>
      <Link
        href={`assignments/${patientId}`}
        title="View Assignments"
        aria-label="View Assignments"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-500 hover:text-sky-700 cursor-pointer flex items-center space-x-1"
      >
        <p>Assignments</p>
        <FaExternalLinkAlt size={10} />
      </Link>
    </>
  );
}
