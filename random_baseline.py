import random
import csv
import math

def map_score(search_result_relevances: list[int], cut_off=10) -> float:
    
    # TODO: Implement MAP
    score = 0
    rel = 0
    for i in range(1, len(search_result_relevances) + 1):
        if search_result_relevances[i - 1] > 3:
            rel += 1
            score += rel / i
        if i == cut_off:
            break
    total_rel_docs = sum([1 for rel in search_result_relevances if rel > 3])
    if total_rel_docs > 0:
        score /= total_rel_docs
    else:
        score = 0
    return score


def ndcg_score(search_result_relevances: list[float],
               ideal_relevance_score_ordering: list[float], cut_off=10):
    
    # TODO: Implement NDCG
    actual_score = 0
    ideal_score = 0
    for i in range(1, len(search_result_relevances) + 1):
        if i != 1:
            actual_score += search_result_relevances[i - 1] / math.log2(i)
            ideal_score += ideal_relevance_score_ordering[i - 1] / math.log2(i)
        else:
            actual_score += search_result_relevances[i - 1]
            ideal_score += ideal_relevance_score_ordering[i - 1]
        if i == cut_off:
            break
    if ideal_score == 0:
        return 0
    else:
        return actual_score / ideal_score
    
def random_result(num):
    result = []

    for i in range(num):
        result.append((random.randrange(105360),1))
    
    return result

def run_relevance_test():
    relevance_data_filename = "annotation.csv"

    csv_file = open(relevance_data_filename)
    csv_file.readline()
    rel = {}
    csv_reader = csv.reader(csv_file, delimiter=",", quotechar='"')
    j = 0
    for line in csv_reader:
        j+=1
        if line[0] not in rel:
            rel[line[0]] = {int(line[2]): int(line[3])}
        else:
            rel[line[0]][int(line[2])] = int(line[3])
        if j == 350:
            break

    total_map_score = 0
    total_ndcg_score = 0
    all_map_score = []
    all_ndcg_score = []
    for query in rel:
        j += 1
        print(query)
        results = random_result(50)
        actual = []
        ideal = []
        for result in results:
            if result[0] in rel[query]:
                actual.append(rel[query][result[0]])
            else:
                actual.append(1)
        ideal_rating = sorted(rel[query].values(), reverse=True)
        for i in range(len(actual)):
            if i < len(ideal_rating):
                ideal.append(ideal_rating[i])
            else:
                ideal.append(1)
        cur_map_score = map_score(actual)
        cur_ndcg_score = ndcg_score(actual, ideal)
        print(cur_ndcg_score)
        print(cur_map_score)
        all_map_score.append(cur_map_score)
        all_ndcg_score.append(cur_ndcg_score)
        total_map_score += cur_map_score
        total_ndcg_score += cur_ndcg_score
            

    map = total_map_score / len(rel)
    ndcg = total_ndcg_score / len(rel)

    return {"map":map,"ndcg":ndcg}

if __name__ == "__main__":
    print(run_relevance_test())
