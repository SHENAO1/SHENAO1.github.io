%% 生成 BPSK-R C/A 码采样误差与周期 FFT 零点对比图
% 本脚本用于个人笔记配图：对比“浮点时间相位采样”和“整数采样点索引采样”。
% 它不修改 BPSK_R.m，只调用同目录工程中的 generateGpsCaCode.m。

clear; clc; close all;

noteDir = fileparts(mfilename('fullpath'));
figureDir = fullfile(noteDir, 'figures');
if ~exist(figureDir, 'dir')
    mkdir(figureDir);
end

bpskDir = 'E:\Code\BOC_TXRX\BOC_Signal_Generator\analysis\BPSK_R';
addpath(bpskDir);

cfg.prn = 1;
cfg.codeLength = 1023;
cfg.codeRate = 1.023e6;
cfg.fs = 16 * 1.023e6;
cfg.simDuration = 40e-3;
cfg.sampleCount = round(cfg.simDuration * cfg.fs);
cfg.t = (0:cfg.sampleCount - 1).' / cfg.fs;
cfg.samplesPerChip = cfg.fs / cfg.codeRate;
cfg.codePeriod = cfg.codeLength / cfg.codeRate;

caCode = generateGpsCaCode(cfg.prn);
caCode = caCode(:);

% 修改前：用浮点时间相位直接计算码片索引。
chipIndexFloat = floor(cfg.t * cfg.codeRate) + 1;
chipIndexFloat = mod(chipIndexFloat - 1, cfg.codeLength) + 1;
caFloat = double(caCode(chipIndexFloat));

% 修改后：用整数采样点编号计算码片索引。
sampleIndex0 = (0:cfg.sampleCount - 1).';
samplesPerChip = round(cfg.samplesPerChip);
chipIndexInteger = floor(sampleIndex0 / samplesPerChip) + 1;
chipIndexInteger = mod(chipIndexInteger - 1, cfg.codeLength) + 1;
caInteger = double(caCode(chipIndexInteger));

samplesPerCodePeriod = round(cfg.codePeriod * cfg.fs);
periodCount = round(cfg.sampleCount / samplesPerCodePeriod);

indexFloatMatrix = reshape(chipIndexFloat, samplesPerCodePeriod, []);
indexIntegerMatrix = reshape(chipIndexInteger, samplesPerCodePeriod, []);
floatDiffPerPeriod = sum(indexFloatMatrix ~= indexFloatMatrix(:, 1), 1);
integerDiffPerPeriod = sum(indexIntegerMatrix ~= indexIntegerMatrix(:, 1), 1);

statsFloat = analyzePeriodicFft(caFloat, cfg.fs, periodCount);
statsInteger = analyzePeriodicFft(caInteger, cfg.fs, periodCount);

fprintf('修改前：浮点时间相位采样\n');
fprintf('  和第 1 个周期不同的周期数: %d\n', sum(floatDiffPerPeriod ~= 0));
fprintf('  最多单周期不同索引点数: %d\n', max(floatDiffPerPeriod));
fprintf('  总不同索引点数: %d\n', sum(floatDiffPerPeriod));
fprintf('  周期匹配频点最大值: %.2f dB\n', statsFloat.matchedMaxDb);
fprintf('  非周期匹配频点最大值: %.2f dB\n', statsFloat.unmatchedMaxDb);
fprintf('  非周期匹配频点最小值: %.2f dB\n\n', statsFloat.unmatchedMinDb);

fprintf('修改后：整数采样点索引采样\n');
fprintf('  和第 1 个周期不同的周期数: %d\n', sum(integerDiffPerPeriod ~= 0));
fprintf('  最多单周期不同索引点数: %d\n', max(integerDiffPerPeriod));
fprintf('  总不同索引点数: %d\n', sum(integerDiffPerPeriod));
fprintf('  周期匹配频点最大值: %.2f dB\n', statsInteger.matchedMaxDb);
fprintf('  非周期匹配频点最大值: %.2f dB\n', statsInteger.unmatchedMaxDb);
fprintf('  非周期匹配频点最小值: %.2f dB\n', statsInteger.unmatchedMinDb);

fig = figure('Color', 'w', 'Position', [100, 100, 980, 540]);
bar(1:periodCount, [floatDiffPerPeriod(:), integerDiffPerPeriod(:)], 'grouped');
grid on;
xlabel('C/A Code Period Number');
ylabel('Differing Chip-Index Samples');
title('Period Consistency Before and After Integer Sampling');
legend('Floating-time sampling', 'Integer-sample indexing', 'Location', 'northwest');
exportgraphics(fig, fullfile(figureDir, 'period-consistency-before-after.png'), 'Resolution', 180);

plotMatchedBins(statsFloat, ...
    'Before Fix: Floating-Time Sampling', ...
    fullfile(figureDir, 'matched-unmatched-before-float.png'));

plotMatchedBins(statsInteger, ...
    'After Fix: Integer-Sample Indexing', ...
    fullfile(figureDir, 'matched-unmatched-after-integer.png'));

fig = figure('Color', 'w', 'Position', [100, 100, 1060, 760]);
tiledlayout(2, 1, 'TileSpacing', 'compact', 'Padding', 'compact');

nexttile;
plot(statsFloat.freqAxisShift / 1e6, statsFloat.powerDbShift, 'LineWidth', 0.8);
grid on;
ylim([-170, 5]);
xlabel('Frequency (MHz)');
ylabel('Normalized Power Spectrum (dB)');
title('Before Fix: Non-Matched Bins Remain Nonzero');

nexttile;
plot(statsInteger.freqAxisShift / 1e6, statsInteger.powerDbShift, 'LineWidth', 0.8);
grid on;
ylim([-170, 5]);
xlabel('Frequency (MHz)');
ylabel('Normalized Power Spectrum (dB)');
title('After Fix: Non-Matched Bins Collapse to eps Floor');
exportgraphics(fig, fullfile(figureDir, 'spectrum-before-after.png'), 'Resolution', 180);

function stats = analyzePeriodicFft(signal, fs, periodCount)
    signal = double(signal(:));
    signalLength = numel(signal);

    spectrum = fft(signal, signalLength);
    power = abs(spectrum).^2;
    powerDb = 10 * log10(power / max(power) + eps);

    k = (0:signalLength - 1).';
    matchedBin = mod(k, periodCount) == 0;
    unmatchedBin = ~matchedBin;

    spectrumShift = fftshift(spectrum);
    powerShift = abs(spectrumShift).^2;
    powerDbShift = 10 * log10(powerShift / max(powerShift) + eps);
    matchedBinShift = fftshift(matchedBin);
    unmatchedBinShift = fftshift(unmatchedBin);
    freqAxisShift = (-signalLength / 2:signalLength / 2 - 1).' * fs / signalLength;

    stats.powerDb = powerDb;
    stats.powerDbShift = powerDbShift;
    stats.freqAxisShift = freqAxisShift;
    stats.matchedBinShift = matchedBinShift;
    stats.unmatchedBinShift = unmatchedBinShift;
    stats.matchedMaxDb = max(powerDb(matchedBin));
    stats.unmatchedMaxDb = max(powerDb(unmatchedBin));
    stats.unmatchedMinDb = min(powerDb(unmatchedBin));
end

function plotMatchedBins(stats, plotTitle, outputPath)
    matchedPowerDb = stats.powerDbShift;
    matchedPowerDb(stats.unmatchedBinShift) = NaN;

    unmatchedPowerDb = stats.powerDbShift;
    unmatchedPowerDb(stats.matchedBinShift) = NaN;

    fig = figure('Color', 'w', 'Position', [100, 100, 920, 620]);
    plot(stats.freqAxisShift / 1e6, matchedPowerDb, '.', 'MarkerSize', 6);
    hold on;
    plot(stats.freqAxisShift / 1e6, unmatchedPowerDb, '.', 'MarkerSize', 4);
    grid on;
    ylim([-170, 5]);
    xlabel('Frequency (MHz)');
    ylabel('Normalized Power Spectrum (dB)');
    title(plotTitle);
    legend('k is a multiple of L', 'k is not a multiple of L', 'Location', 'northeast');
    exportgraphics(fig, outputPath, 'Resolution', 180);
end
