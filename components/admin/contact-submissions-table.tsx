"use client";

import { useMemo, useState, useTransition } from "react";
import { MoreHorizontal, Search, Mail, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  ContactSubmission,
  ContactSubmissionStatus,
} from "@/types/contact-submission";
import {
  deleteSubmissionAction,
  setSubmissionStatusAction,
} from "@/app/admin/contacts/actions";

const STATUS_LABEL: Record<ContactSubmissionStatus, string> = {
  new: "New",
  read: "Read",
  archived: "Archived",
};

const STATUS_VARIANT: Record<
  ContactSubmissionStatus,
  "default" | "secondary" | "outline"
> = {
  new: "default",
  read: "secondary",
  archived: "outline",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function ContactSubmissionsTable({
  submissions,
}: {
  submissions: ContactSubmission[];
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    ContactSubmissionStatus | "all"
  >("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [selected, setSelected] = useState<ContactSubmission | null>(null);
  const [isPending, startTransition] = useTransition();

  const sources = useMemo(() => {
    const set = new Set(
      submissions.map((s) => s.source).filter((s): s is string => !!s),
    );
    return Array.from(set);
  }, [submissions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return submissions.filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        (s.email ?? "").toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      const matchesSource = sourceFilter === "all" || s.source === sourceFilter;
      return matchesQuery && matchesStatus && matchesSource;
    });
  }, [submissions, query, statusFilter, sourceFilter]);

  function handleStatusChange(id: string, status: ContactSubmissionStatus) {
    startTransition(() => {
      setSubmissionStatusAction(id, status);
    });
  }

  function handleDelete(id: string) {
    startTransition(() => {
      deleteSubmissionAction(id);
    });
    setSelected(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={statusFilter}
            onValueChange={(v) =>
              setStatusFilter(v as ContactSubmissionStatus | "all")
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          {sources.length > 0 && (
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sources</SelectItem>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No submissions match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((submission) => (
                  <TableRow
                    key={submission.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(submission)}
                  >
                    <TableCell className="font-medium">
                      {submission.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex flex-col gap-0.5 text-sm">
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          {submission.phone}
                        </span>
                        {submission.email && (
                          <span className="flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5" />
                            {submission.email}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {submission.source ? (
                        <Badge variant="outline">{submission.source}</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={STATUS_VARIANT[submission.status]}>
                        {STATUS_LABEL[submission.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(submission.createdAt)}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            disabled={isPending}
                            onClick={() =>
                              handleStatusChange(submission.id, "read")
                            }
                          >
                            Mark as read
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={isPending}
                            onClick={() =>
                              handleStatusChange(submission.id, "archived")
                            }
                          >
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            disabled={isPending}
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleDelete(submission.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription>
                  Submitted {formatDate(selected.createdAt)}
                  {selected.source ? ` via ${selected.source}` : ""}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selected.phone}</span>
                </div>
                {selected.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selected.email}</span>
                  </div>
                )}
                {selected.message && (
                  <p className="rounded-md border bg-muted/50 p-3 text-muted-foreground">
                    {selected.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={() => handleStatusChange(selected.id, "archived")}
                >
                  Archive
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isPending}
                  onClick={() => handleDelete(selected.id)}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
