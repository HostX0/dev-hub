import { BadRequestException } from '@nestjs/common';
export type Input = Record<string, any>;
export function object(value: unknown, keys?: string[]): Input {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new BadRequestException('Expected an object');
  const data = value as Input;
  if (keys && Object.keys(data).some((k) => !keys.includes(k)))
    throw new BadRequestException('Unknown field');
  return data;
}
export function str(value: unknown, max: number, required = false): string {
  if (
    typeof value !== 'string' ||
    value.length > max ||
    (required && !value.trim())
  )
    throw new BadRequestException('Invalid text field');
  return value.trim();
}
export function int(value: unknown, min = 0, max = 1000000): number {
  if (
    !Number.isInteger(value) ||
    (value as number) < min ||
    (value as number) > max
  )
    throw new BadRequestException('Invalid integer');
  return value as number;
}
export function bool(value: unknown): boolean {
  if (typeof value !== 'boolean')
    throw new BadRequestException('Invalid boolean');
  return value;
}
export function strings(value: unknown, count = 100, length = 500): string[] {
  if (!Array.isArray(value) || value.length > count)
    throw new BadRequestException('Invalid list');
  return value.map((v) => str(v, length));
}
export function url(
  value: unknown,
  allowPath = false,
  required = false,
): string {
  const s = str(value, 2048, required);
  if (!s) return s;
  if (allowPath && /^\/(?!\/)[\w/.-]+$/.test(s) && !s.split('/').includes('..'))
    return s;
  try {
    const u = new URL(s);
    if (!['https:', 'http:'].includes(u.protocol) || u.username || u.password)
      throw Error();
  } catch {
    throw new BadRequestException(
      'Expected an HTTP(S) URL without credentials',
    );
  }
  return s;
}
export function password(value: unknown): string {
  if (
    typeof value !== 'string' ||
    value.length < 8 ||
    Buffer.byteLength(value, 'utf8') > 72
  )
    throw new BadRequestException(
      'Password must contain at least 8 characters and at most 72 bytes',
    );
  return value;
}
export function nonEmpty(data: Input) {
  if (!Object.keys(data).length)
    throw new BadRequestException('No changes supplied');
}
export function visibility(value: unknown) {
  return { published: bool(object(value, ['published']).published) };
}
