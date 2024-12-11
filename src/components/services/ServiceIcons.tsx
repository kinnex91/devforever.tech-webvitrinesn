import {
  ServerIcon,
  CloudIcon,
  CircleStackIcon,
  CpuChipIcon,
  ArrowsRightLeftIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon,
  CommandLineIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';

export const serviceIcons = {
  infrastructure: ServerIcon,
  cloud: CloudIcon,
  database: CircleStackIcon,
  middleware: CpuChipIcon,
  etl: ArrowsRightLeftIcon,
  web: CodeBracketIcon,
  tma: WrenchScrewdriverIcon,
  software: CommandLineIcon,
  technology: CubeIcon,
} as const;