import { IsArray, IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpsertProjectDto {
  @IsString() @MaxLength(160) title: string;
  @IsOptional() @IsString() @MaxLength(120) slug?: string;
  @IsOptional() @IsString() @MaxLength(240) tagline?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() @MaxLength(160) titleEn?: string;
  @IsOptional() @IsString() @MaxLength(240) taglineEn?: string;
  @IsOptional() @IsString() descriptionEn?: string;
  @IsOptional() @IsString() @MaxLength(60) category?: string;
  @IsOptional() @IsArray() tags?: string[];
  @IsOptional() @IsString() liveUrl?: string;
  @IsOptional() @IsString() repoUrl?: string;
  @IsOptional() @IsString() coverImage?: string;
  @IsOptional() @IsArray() gallery?: string[];
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsBoolean() published?: boolean;
  @IsOptional() @IsInt() year?: number | null;
  @IsOptional() @IsString() @MaxLength(120) client?: string;
  @IsOptional() @IsInt() sortOrder?: number;
}
