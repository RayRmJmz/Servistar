import { Box, Skeleton } from "@mui/material";

export type SkeletonGridProps = {
  rowCount?: number;
};

export default function SkeletonGrid(props: SkeletonGridProps) {
  const { rowCount = 10 } = props;
  return (
    <Box sx={{ marign: "10px 5px" }}>
      {Array(rowCount)
        .fill("")
        .map((_, index: number) => (
          <Skeleton
            key={index}
            sx={{
              marginBottom: "1px",
              height: "52px",
            }}
            animation="wave"
          />
        ))}
    </Box>
  );
}
