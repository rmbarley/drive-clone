import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contents";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const folders = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId));

  const files = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));
  return <DriveContents files={files} folders={folders} />;
}
